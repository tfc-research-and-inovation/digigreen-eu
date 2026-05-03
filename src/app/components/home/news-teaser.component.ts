import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsItem } from '../../models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-teaser',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <div class="bg-white rounded-2xl border border-[#E8E4DC] p-6 md:p-8 flex flex-col">
      <h3 class="text-lg font-semibold text-[#2D3436] mb-4">Latest News</h3>
      @if (news.length === 0) {
        <p class="text-sm text-[#7C9082] flex-1">No news items yet.</p>
      } @else {
        <ul class="space-y-4 flex-1">
          @for (item of news; track item.id) {
            <li class="border-b border-[#E8E4DC] pb-4 last:border-0 last:pb-0">
              <p class="text-xs text-[#7C9082] mb-1">{{ item.publish_date | date:'mediumDate' }}</p>
              <a [routerLink]="'/NewsDetail'" [queryParams]="{id: item.id}"
                 class="text-sm font-medium text-[#2D3436] hover:text-[#7C9082] transition-colors line-clamp-2">
                {{ item.title }}
              </a>
            </li>
          }
        </ul>
      }
      <a routerLink="/News"
         class="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#7C9082] hover:text-[#5A6B5E] transition-colors">
        All news
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  `,
})
export class NewsTeaserComponent {
  @Input() news: NewsItem[] = [];
}

