# Auto-deploy με GitHub Actions

> Κατάσταση (27/10/2026): το spec είναι έτοιμο. Το workflow **δεν έχει γραφτεί ακόμα** γιατί περιμένουμε τις απαντήσεις στις ανοιχτές ερωτήσεις παρακάτω.

## Στόχος
Σε κάθε push στο `main` να γίνεται build και να ανεβαίνει αυτόματα το site στον live server (Blacknight, Plesk, Apache), ώστε να μη χρειάζεται χειροκίνητο upload με FileZilla.

## Τι ξέρουμε για το project
- **Angular 21**. Το `npm run build` βγάζει στατικά αρχεία στο `dist/digigreentt/browser/`.
- Το SSR είναι μισοστημένο: υπάρχει `app.config.server.ts`, αλλά λείπει το `server.ts` και το `prerender` είναι `false`. Άρα αρκεί **στατικό hosting** και δεν χρειάζεται Node server.
- Το routing χρησιμοποιεί κανονικά paths (`<base href="/">`, χωρίς `#`). Ο server πρέπει να σερβίρει το `index.html` για κάθε URL που δεν αντιστοιχεί σε αρχείο. Αυτό το κάνει το `.htaccess`. Αν λείπει, το refresh στο `/news` βγάζει 404.
- Remote: `github.com/tfc-research-and-inovation/digigreen-eu` (repo οργανισμού).
- Σήμερα δεν υπάρχει φάκελος `.github/workflows`.
- Hosting: **Blacknight**, με panel **Plesk** και Apache. Στον server υπάρχει ήδη `.htaccess`. Τα αρχεία ανεβαίνουν σήμερα με **FileZilla**.
- Το domain είναι ήδη ρυθμισμένο και δείχνει στον server.

## Πώς θα δουλεύει
1. Trigger: `push` στο `main`, καθώς και χειροκίνητα από το GitHub (`workflow_dispatch`)
2. Checkout, μετά Node 22 με npm cache, μετά `npm ci` και τέλος `npm run build`
3. Upload του `dist/digigreentt/browser/` στον φάκελο του site με FTP(S), μέσω του `SamKirkland/FTP-Deploy-Action@v4.3.5`. Ανεβαίνουν μόνο τα αρχεία που άλλαξαν.
4. `concurrency` group, ώστε δύο γρήγορα διαδοχικά pushes να μην ανεβάζουν ταυτόχρονα
5. Αν αποτύχει το build, δεν ανεβαίνει τίποτα και το live site μένει ως έχει.

### Αρχεία που θα δημιουργηθούν
- `.github/workflows/deploy.yml`: το workflow
- `public/.htaccess`: οι κανόνες για το fallback στο `index.html`. Επειδή είναι στο `public/`, μπαίνει στο build και ανεβαίνει σε κάθε deploy.

## Ανοιχτές ερωτήσεις (χρειάζονται απάντηση για να συνεχίσουμε)
1. **Πρωτόκολλο:** στο FileZilla, στο Site Manager, τι γράφει το πεδίο Protocol; FTP, FTPS ή SFTP; Για SFTP χρειάζεται άλλο action.
2. **Φάκελος του site:** σε ποιον φάκελο βρίσκεται το `index.html` όταν συνδέεσαι; Στο Plesk είναι συνήθως `/httpdocs/`.
3. **Περιεχόμενο του `.htaccess`:** αντιγραφή από τον server, για να μπει στο `public/`. Δεν περιέχει κωδικούς.
4. **Άλλα αρχεία στον φάκελο:** υπάρχει κάτι που δεν προέρχεται από το Angular build, π.χ. άλλοι φάκελοι, uploads ή κάποιο subdomain; Πρέπει να το ξέρουμε για να μην το πειράξει το deploy.

## Ενέργειες που πρέπει να γίνουν χειροκίνητα
- [ ] Στο GitHub, στο repo `digigreen-eu`: Settings → Secrets and variables → Actions → New repository secret. Χρειάζονται τρία secrets:
  - `FTP_SERVER`
  - `FTP_USERNAME`
  - `FTP_PASSWORD`

  Απαιτούνται δικαιώματα admin στο repo του οργανισμού.
- [ ] (Προτείνεται) Ξεχωριστός FTP user στο Plesk μόνο για το deploy, με πρόσβαση μόνο στον φάκελο του site. Αν διαρρεύσει ο κωδικός, αλλάζει χωρίς να επηρεαστεί τίποτα άλλο.
- [ ] Αν το repo είναι private: το GitHub Actions δίνει δωρεάν λεπτά κάθε μήνα και κάθε build κρατάει περίπου 2 λεπτά, οπότε δεν υπάρχει πρόβλημα.

## Όρια
- Πάντα: το build πρέπει να πετύχει πριν ανέβει οτιδήποτε. Τα credentials μπαίνουν μόνο σε GitHub Secrets.
- Ρωτάμε πρώτα: πριν σβηστούν στον server αρχεία που δεν ανέβασε το workflow.
- Ποτέ: commit credentials, αλλαγές σε αρχεία έξω από τον φάκελο του site.

## Κριτήρια επιτυχίας
- Μετά από push στο `main`, το run στο Actions βγαίνει πράσινο και η αλλαγή φαίνεται στο live domain μέσα σε περίπου 5 λεπτά.
- Ένα αποτυχημένο build δεν αλλάζει το live site.
- Το refresh σε deep link (π.χ. `/news`) δείχνει τη σελίδα και όχι 404.

## Επόμενα βήματα (αύριο)
1. Απαντήσεις στις ερωτήσεις 1–4
2. Προσθήκη των 3 secrets στο GitHub
3. Γράφουμε το `.github/workflows/deploy.yml` και το `public/.htaccess`
4. Τοπικό build, για να επιβεβαιωθεί ότι το `.htaccess` υπάρχει στο `dist/digigreentt/browser/`
5. Push στο `main`, παρακολούθηση του run στο Actions και έλεγχος του live site (και refresh σε deep link)
