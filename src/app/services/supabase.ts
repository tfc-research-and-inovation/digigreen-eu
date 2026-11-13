import { Injectable } from '@angular/core';
import {AuthTokenResponsePassword, createClient} from '@supabase/supabase-js';
import {environment} from '../../environmetns/environment';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private readonly supabase = createClient(
    environment.supabaseUrl,
    environment.supabasePublishableKey
  )

  async login(email: string, password: string): Promise<AuthTokenResponsePassword> {
    const response = await this.supabase.auth.signInWithPassword({email, password})
    if (response.error) {
      // toaster here
      console.error(response.error)
    }
    return response
  }
}
