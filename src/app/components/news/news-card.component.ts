import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NewsItem } from '../../models';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <article class="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      @if (item.image_url) {
        <img [src]="item.image_url" [alt]="item.image_alt || item.title"
             class="w-full h-48 object-cover"/>
      }
      <div class="p-6 flex flex-col flex-1">
        <div class="flex flex-wrap gap-2 mb-3">
          @for (tag of (item.tags ?? []); track tag) {
            <span class="px-2 py-0.5 text-xs bg-[#7C9082]/10 text-[#7C9082] rounded-full">{{ tag }}</span>
          }
        </div>
        <h3 class="text-lg font-semibold text-[#2D3436] mb-2 line-clamp-2">{{ item.title }}</h3>
        <p class="text-sm text-[#5A6B5E] line-clamp-3 flex-1">{{ item.excerpt }}</p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-xs text-[#7C9082]">{{ item.publish_date | date:'mediumDate' }}</span>
          <a [routerLink]="'/NewsDetail'" [queryParams]="{id: item.id}"
             class="text-sm font-medium text-[#7C9082] hover:text-[#5A6B5E] transition-colors">
            Read more →
          </a>
        </div>
      </div>
    </article>
  `,
})
export class NewsCardComponent {
  @Input() item!: NewsItem;
}

