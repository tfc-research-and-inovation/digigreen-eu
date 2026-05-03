import { Component, Input } from '@angular/core';
import { Partner } from '../../models';

@Component({
  selector: 'app-partner-card',
  standalone: true,
  template: `
    <div class="bg-white rounded-xl border border-[#E8E4DC] p-6 flex flex-col gap-4">
      @if (partner.logo_url) {
        <img [src]="partner.logo_url" [alt]="partner.name + ' logo'" class="h-12 object-contain self-start"/>
      }
      <div>
        <div class="flex items-center gap-2 flex-wrap">
          <h3 class="text-base font-semibold text-[#2D3436]">{{ partner.acronym }}</h3>
          @if (partner.is_coordinator) {
            <span class="px-2 py-0.5 text-xs bg-[#7C9082]/10 text-[#7C9082] rounded-full font-medium">Coordinator</span>
          }
        </div>
        <p class="text-sm text-[#5A6B5E] mt-0.5">{{ partner.name }}</p>
        <p class="text-xs text-[#7C9082] mt-1">{{ partner.country }}</p>
      </div>
      @if (partner.description) {
        <p class="text-sm text-[#5A6B5E] leading-relaxed">{{ partner.description }}</p>
      }
      @if (partner.website) {
        <a [href]="partner.website" target="_blank" rel="noopener noreferrer"
           class="mt-auto inline-flex items-center gap-1 text-sm text-[#7C9082] hover:text-[#5A6B5E] transition-colors">
          Visit website
          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      }
    </div>
  `,
})
export class PartnerCardComponent {
  @Input() partner!: Partner;
}

