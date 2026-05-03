import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teaser-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-white rounded-2xl border border-[#E8E4DC] p-6 md:p-8 flex flex-col">
      <div class="w-12 h-12 rounded-xl bg-[#7C9082]/10 flex items-center justify-center mb-5">
        <svg class="h-6 w-6 text-[#7C9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-[#2D3436] mb-3">{{ title }}</h3>
      <p class="text-sm text-[#5A6B5E] leading-relaxed flex-1">{{ description }}</p>
      <a [routerLink]="'/'+linkPage"
         class="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#7C9082] hover:text-[#5A6B5E] transition-colors">
        {{ linkText }}
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  `,
})
export class TeaserCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() linkText = 'Learn more';
  @Input() linkPage = '';
}

