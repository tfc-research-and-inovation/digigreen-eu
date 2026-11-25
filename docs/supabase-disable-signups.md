# Disable public signups (Supabase)

**Why:** the admin RLS policies give every `authenticated` user write access to `news`,
`resources` and `projects`. While signups are open, anyone can call `auth.signUp()` with the
publishable key (it is in the JS bundle), become `authenticated`, and edit content. With signups
off, only users you create yourself can log in.

Do this **before** you apply `<ts>_admin_write_rls.sql` to the remote project.

## Remote project (supabase.com)
1. Open https://supabase.com/dashboard and select the project.
2. Left sidebar: **Authentication**.
3. Open **Sign In / Providers**. In older dashboards this is under **Settings**.
4. In the **User Signups** section, turn **Allow new users to sign up** **off**.
5. Click **Save**.

The Supabase dashboard changes often. If a label differs, search the Authentication settings for
"Allow new users to sign up".

**Check that it worked:** in a terminal, using the values from `src/environmetns/environment.ts`:
```bash
curl -s -X POST "https://<project-ref>.supabase.co/auth/v1/signup" \
  -H "apikey: <publishable key>" -H "Content-Type: application/json" \
  -d '{"email":"test-signup@example.com","password":"Test-123456"}'
```
Expected: an error such as `"Signups not allowed for this instance"`. If you get a user object
back instead, signups are still on. Delete that test user under **Authentication → Users**.

## Local stack (optional)
The local equivalent is `supabase/config.toml`:
```toml
[auth]
enable_signup = false
```
Then restart: `npm run db:stop && npm run db:start`.
Locally this matters less, because the local DB is only on your machine.
