import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Supabase } from '../services/supabase';

/** Lets the user into /admin only with a Supabase session, otherwise redirects to /admin/login. */
export const adminGuard: CanActivateFn = async () => {
  const supabase = inject(Supabase);
  const router = inject(Router);
  const { data } = await supabase.client.auth.getSession();
  return data.session ? true : router.createUrlTree(['/admin/login']);
};
