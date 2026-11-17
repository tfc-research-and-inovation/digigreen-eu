import { Injectable } from '@angular/core';
import {AuthTokenResponsePassword, createClient} from '@supabase/supabase-js';
import {environment} from '../../environmetns/environment';
import {Database} from '../types/database.types';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  readonly client = createClient<Database>(
    environment.supabaseUrl,
    environment.supabasePublishableKey
  )

  async login(email: string, password: string): Promise<AuthTokenResponsePassword> {
    const response = await this.client.auth.signInWithPassword({email, password})
    if (response.error) {
      // toaster here
      console.error(response.error)
    }
    return response
  }
}
