import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen flex bg-[#F5F3EF]">
      <aside class="w-60 shrink-0 bg-[#2D3436] text-white flex flex-col">
        <a routerLink="/admin" class="block px-6 py-5 text-lg font-semibold">Admin</a>
        <nav class="flex flex-col">
          @for (item of menu; track item.path) {
            <a [routerLink]="item.path" routerLinkActive="bg-[#7C9082]"
               class="px-6 py-3 hover:bg-[#7C9082]/60">
              <i [class]="item.icon + ' w-5 mr-2'"></i>{{ item.label }}
            </a>
          }
        </nav>
        <button type="button" (click)="logout()" class="mt-auto text-left px-6 py-4 hover:bg-[#7C9082]/60">
          <i class="fa-solid fa-right-from-bracket w-5 mr-2"></i>Logout
        </button>
      </aside>
      <section class="flex-1 p-8 overflow-x-auto">
        <router-outlet />
      </section>
    </div>
  `,
})
export class AdminShell {
  private readonly supabase = inject(Supabase);
  private readonly router = inject(Router);

  protected readonly menu = [
    { label: 'Resources', path: '/admin/resources', icon: 'fa-solid fa-file-lines' },
    { label: 'News', path: '/admin/news', icon: 'fa-solid fa-newspaper' },
    { label: 'Projects', path: '/admin/projects', icon: 'fa-solid fa-diagram-project' },
  ];

  async logout() {
    await this.supabase.client.auth.signOut();
    await this.router.navigate(['/admin/login']);
  }
}
