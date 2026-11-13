# Αλλαγές στον κώδικα για τη μετάβαση σε Supabase

Η βάση είναι έτοιμη: schema, RLS, seed και types (βλ. `docs/SPEC-supabase-data.md`).
Εδώ είναι ό,τι πρέπει να αλλάξεις στον κώδικα για να διαβάζει από το Supabase αντί για τα `public/data/*.json`.

## 1. Environment

`src/environmetns/environment.ts`:

```ts
supabaseUrl: 'http://127.0.0.1:54321',       // τοπικά, βλ. `npx supabase status`
supabasePublishableKey: '<Publishable key από το `npx supabase status`>',
```

Για το remote project: Dashboard → Project Settings → API (URL + publishable key).
**Μην** βάλεις ποτέ το `service_role` / secret key στο frontend.

> Σημείωση: ο φάκελος λέγεται `environmetns` (typo). Αν τον διορθώσεις, άλλαξε και τα imports.

## 2. Supabase client με types

Τα types υπάρχουν ήδη στο `src/app/types/database.types.ts` και παράγονται από τη βάση.
Ξαναπαράγονται κάθε φορά που αλλάζει το schema:

```bash
npx supabase gen types typescript --local > src/app/types/database.types.ts
```

Δώσε τα types στον client, για να έχεις autocomplete στα ονόματα πινάκων και στηλών:

```ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

createClient<Database>(environment.supabaseUrl, environment.supabasePublishableKey);
```

Ένας client για όλη την εφαρμογή. Το service `Supabase` που υπάρχει ήδη είναι καλό σημείο για αυτόν.

## 3. Models (`src/app/models/index.ts`)

| Model | Αλλαγή |
|---|---|
| `Event` | `id: number` → `id: string` |
| `Partner` | `order` → `sort_order` |
| `SisterProject` | `order` → `sort_order`, `isCoordinator` → `is_coordinator`, `belongsToProject` → `belongs_to_project`, `featured_only` γίνεται πάντα `boolean` (όχι optional) |
| `Resource` | νέο πεδίο `belongs_to_project?: string` (υπάρχει στα δεδομένα αλλά όχι στο model) |
| `Tool` | `order` → `sort_order` |
| `Organization` | `order` → `sort_order` |

Γενικά:
- Τα optional πεδία έρχονται ως **`null`**, όχι `undefined` και όχι `""`. Για παράδειγμα, `website: string | null`.
  Οι έλεγχοι στα templates, όπως `@if (item.website)`, δουλεύουν κανονικά.
- Οι ημερομηνίες (`event_date`, `publish_date`) έρχονται ως `"YYYY-MM-DD"`.
- Τα ids των resources άλλαξαν σε `"1"`…`"32"`, γιατί το JSON είχε διπλά ids. Επηρεάζουν μόνο το `track r.id`.
- Κάθε εγγραφή έχει επιπλέον `created_at` και `updated_at`. Μπορείς να τα αγνοήσεις.
- Εναλλακτικά, μπορείς να ορίσεις τα models από τα generated types:
  `type Tool = Database['public']['Tables']['tools']['Row'];`

Ψάξε στα templates και στα components για χρήσεις των πεδίων που μετονομάστηκαν (`order`, `isCoordinator`, `belongsToProject`):

```bash
grep -rn "\.order\b\|isCoordinator\|belongsToProject" src/app
```

## 4. Τι αντικαθιστά τι

| Σημερινό σημείο | Πίνακας | Ταξινόμηση / φίλτρο που κάνει πλέον η βάση |
|---|---|---|
| `EventsService` (`/data/events.json`) | `events` | `getUpcoming`: `.eq('is_upcoming', true).order('event_date')`, `.limit(count)` |
| `NewsService` (`/data/news.json`) | `news` | `getPublished`: `.eq('is_archived', false).order('publish_date', { ascending: false })`; `getArchived`: `.eq('is_archived', true)`; `getById`: `.eq('id', id).maybeSingle()` |
| `PartnersService` | `partners` | `.order('sort_order')` |
| `SisterProjectsService` | `sister_projects` | `.order('sort_order')` |
| `ResourcesService` | `resources` | `.order('publish_date', { ascending: false, nullsFirst: false })`; `getByType`: `.eq('resource_type', type)` |
| `pages/tools/tools.ts` (`httpResource` → `/data/tools.json`) | `tools` | `.order('sort_order')` |
| `pages/organizations/organizations.ts` (`httpResource` → `/data/organizations.json`) | `organizations` | `.order('sort_order')` |

Ενδεικτική μορφή κλήσης:

```ts
const { data, error } = await supabase.from('tools').select('*').order('sort_order');
```

## 5. Φίλτρα που δεν χρειάζονται πια

Το RLS **δεν επιστρέφει ποτέ μη δημοσιευμένες εγγραφές** (`is_published = false`) στους πίνακες
`news`, `resources`, `tools` και `organizations`. Άρα:
- Τα `.filter(x => x.is_published)` στα services/components περισσεύουν. Αν μείνουν, δεν πειράζει.
- Το `getAll()` του `NewsService` δεν θα επιστρέφει πια μη δημοσιευμένα νέα.

## 6. Αλλαγές λόγω async / SSR

- Το `supabase-js` επιστρέφει `Promise`, ενώ τα services σήμερα επιστρέφουν `Observable` από `HttpClient`.
  Επιλογές: τύλιξέ το με `from(...)` για να μείνουν τα σημερινά signatures, ή πέρασε σε `resource()` / signals.
- Τα `tools.ts` και `organizations.ts` χρησιμοποιούν `httpResource`. Με το supabase-js γίνονται `resource({ loader: ... })`.
- Ο χειρισμός λάθους αλλάζει: έλεγχος του `error` στο `{ data, error }` αντί για HTTP error.
- **SSR:** το `HttpClient` κάνει transfer state και δεν ξανακάνει το request στο hydration. Οι κλήσεις του supabase-js
  **θα γίνουν δύο φορές** (μία στον server και μία στον browser). Αν σε ενοχλεί, χρειάζεται `TransferState`
  ή κλήσεις στο REST API του Supabase μέσω `HttpClient`.

## 7. Tests

Τα specs των services που κάνουν mock το `HttpClient` / `/data/*.json` θα χρειαστούν mock του Supabase client.

## 8. Καθάρισμα στο τέλος

Όταν δεν διαβάζει πια τίποτα από το `/data/*.json`:
- σβήσε τα `public/data/*.json`
- έλεγξε ότι δεν έμεινε κανένα `'/data/` στον κώδικα:

```bash
grep -rn "'/data/" src
```

## 9. Remote project

Όταν είσαι έτοιμος για production:

```bash
npx supabase link --project-ref <project-ref>
npx supabase db push                    # migrations
```

Τα δεδομένα του `seed.sql` **δεν** ανεβαίνουν με το `db push`. Για το πρώτο γέμισμα τρέχεις το
`supabase/seed.sql` μία φορά από το Dashboard → SQL Editor, ή με `psql`.
