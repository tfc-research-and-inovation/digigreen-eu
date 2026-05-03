import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p class="text-6xl font-semibold text-[#7C9082]">404</p>
      <h1 class="mt-4 text-2xl font-semibold text-[#2D3436]">Page not found</h1>
      <p class="mt-2 text-[#5A6B5E]">The page you're looking for doesn't exist.</p>
      <a routerLink="/Home"
         class="mt-6 inline-flex items-center gap-2 bg-[#7C9082] hover:bg-[#5A6B5E] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
        Back to Home
      </a>
    </div>
  `,
})
export class NotFoundComponent {}

