import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <section class="bg-[#2D3436] text-white py-12 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-xs text-[#7C9082] uppercase tracking-widest mb-2">{{ breadcrumb }}</p>
        <h1 class="text-3xl md:text-4xl font-semibold tracking-tight">{{ title }}</h1>
        @if (subtitle) {
          <p class="mt-3 text-gray-300 max-w-2xl">{{ subtitle }}</p>
        }
      </div>
    </section>
  `,
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() breadcrumb = '';
}


