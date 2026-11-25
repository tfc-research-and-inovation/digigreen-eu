import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField } from '@angular/forms/signals';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-admin-login',
  imports: [FormField],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-[#F5F3EF] px-4">
      <form (submit)="login($event)" class="w-full max-w-sm bg-white rounded-lg shadow p-8 space-y-5">
        <h1 class="text-2xl font-semibold text-[#2D3436]">Admin login</h1>
        <label class="block">
          <span class="text-sm text-gray-600">Email</span>
          <input type="email" [formField]="f.email" class="mt-1 w-full border rounded px-3 py-2" />
        </label>
        <label class="block">
          <span class="text-sm text-gray-600">Password</span>
          <input type="password" [formField]="f.password" class="mt-1 w-full border rounded px-3 py-2" />
        </label>
        @if (error()) {
          <p class="text-sm text-red-600"><i class="fa-solid fa-circle-exclamation mr-1"></i>{{ error() }}</p>
        }
        <button type="submit" class="w-full bg-[#2D3436] text-white rounded py-2 hover:bg-[#7C9082]">
          <i class="fa-solid fa-right-to-bracket mr-2"></i>Login
        </button>
      </form>
    </div>
  `,
})
export class AdminLogin {
  private readonly supabase = inject(Supabase);
  private readonly router = inject(Router);

  protected readonly model = signal({ email: '', password: '' });
  protected readonly f = form(this.model);
  protected readonly error = signal('');

  async login(event: Event) {
    event.preventDefault();
    this.error.set('');
    const { email, password } = this.model();
    const { error } = await this.supabase.login(email, password);
    if (error) {
      this.error.set(error.message);
      return;
    }
    await this.router.navigate(['/admin']);
  }
}
