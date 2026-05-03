import { Component, Input } from '@angular/core';
import { SisterProject } from '../../models';

@Component({
  selector: 'app-project-card',
  standalone: true,
  template: `
    <div class="bg-white rounded-xl border border-[#E8E4DC] p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div class="flex items-start justify-between gap-4">
        @if (project.logo_url) {
          <img [src]="project.logo_url" [alt]="project.name + ' logo'" class="h-10 object-contain"/>
        }
        <span [class]="project.status === 'Onboard' ? 'bg-[#7C9082]/10 text-[#7C9082]' : 'bg-[#C67B5C]/10 text-[#C67B5C]'"
              class="px-2 py-0.5 text-xs rounded-full font-medium shrink-0">
          {{ project.status }}
        </span>
      </div>
      <div>
        <h3 class="text-base font-semibold text-[#2D3436]">{{ project.name }}</h3>
        <p class="mt-2 text-sm text-[#5A6B5E] leading-relaxed line-clamp-3">{{ project.description }}</p>
      </div>
      @if (project.tags && project.tags.length > 0) {
        <div class="flex flex-wrap gap-1.5">
          @for (tag of project.tags; track tag) {
            <span class="px-2 py-0.5 text-xs bg-[#F5F3EF] text-[#5A6B5E] rounded-full">{{ tag }}</span>
          }
        </div>
      }
      @if (project.website) {
        <a [href]="project.website" target="_blank" rel="noopener noreferrer"
           class="mt-auto inline-flex items-center gap-1 text-sm text-[#7C9082] hover:text-[#5A6B5E] transition-colors">
          Visit project
          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      }
    </div>
  `,
})
export class ProjectCardComponent {
  @Input() project!: SisterProject;
}

