# Supabase Auth setup for the admin area

The admin login (`/admin/login`) uses email + password through
`Supabase.login()` → `client.auth.signInWithPassword()` (`src/app/services/supabase.ts`).
You only need **one** user, created by hand. Nobody can register themselves.

## Steps (remote project)

### 1. Disable public signups
Follow `docs/supabase-disable-signups.md` first.

### 2. Make sure the Email provider is enabled
**Authentication → Sign In / Providers → Email**: it must be **enabled** (this is the default).
You can leave "Confirm email" as it is, because the user you create in step 3 is confirmed by hand.

### 3. Create the admin user
1. **Authentication → Users**.
2. **Add user → Create new user**.
3. Enter the email and a strong password.
4. Tick **Auto Confirm User**. Otherwise the user must click an email link before they can log in.
5. **Create user**.

Keep the password in a password manager. You give it to the content manager together with the
`/admin/login` URL.

### 4. Apply the migrations
From the project root (logged in with `npx supabase login` and linked with
`npx supabase link --project-ref <project-ref>`):
```bash
npx supabase db push
```
This applies `<ts>_rename_sister_projects.sql` and `<ts>_admin_write_rls.sql`. Run it only after
step 1.

### 5. Test
1. `npm start` → open http://localhost:4200/admin/login.
2. Log in with the user from step 3.
3. DevTools → Application → Local Storage: a key `sb-<project-ref>-auth-token` now exists.
   That key means the session is active.
4. Open News, edit a row, Save → check the change in Supabase → **Table Editor → news**.

If Save fails with `permission denied` or the row is not changed, either the session is missing
(you logged in with wrong credentials) or the migration from step 4 is not applied.

## Local stack (optional)
1. `npm run db:start` → Studio at http://127.0.0.1:54323.
2. Studio → **Authentication → Add user** (same as step 3).
   A local test user already exists: `admin@local.test` / `admin-local-123` (local stack only;
   it is removed by `npm run db:reset`).
3. `npm run db:reset` applies all migrations + seed locally.
4. To point the app at the local stack, use the local URL and anon key printed by
   `npx supabase status` in your development environment file.

## What never to do
- Never put the **service_role** key (or secret key) in the Angular app or in git. The app uses
  only the publishable key. Security comes from RLS + a logged-in user.
- Never re-enable signups while the admin write policies exist.

## Later (not part of this iteration)
- A route guard on `/admin/**` that checks `client.auth.getSession()`.
- Restricting writes to specific users (e.g. an `admins` table or a custom claim) instead of every
  `authenticated` user.
