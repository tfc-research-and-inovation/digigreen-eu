// Local Supabase (npx supabase start). Values from `npx supabase status`.
// Replaces environment.ts in the `development` configuration (ng serve) via angular.json fileReplacements.
export const environment = {
  production: false,
  supabaseUrl: 'http://127.0.0.1:54321',
  supabasePublishableKey: 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH',
};
