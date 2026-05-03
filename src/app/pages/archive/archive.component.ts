import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { NewsItem } from '../../models';
import { PageHeaderComponent } from '../../components/shared/page-header.component';
import { LoadingStateComponent } from '../../components/shared/loading-state.component';
import { EmptyStateComponent } from '../../components/shared/empty-state.component';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [RouterLink, DatePipe, PageHeaderComponent, LoadingStateComponent, EmptyStateComponent],
  template: `
    <div>
      <app-page-header title="Archive" subtitle="Archived news and past updates from the FITTER-EU project." breadcrumb="Archive"/>
      <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          @if (loading()) {
            <app-loading-state message="Loading archive…"/>
          } @else if (news().length === 0) {
            <app-empty-state title="Archive is empty" message="Archived items will appear here."/>
          } @else {
            <div class="space-y-4">
              @for (item of news(); track item.id) {
                <div class="bg-white rounded-xl border border-[#E8E4DC] p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-4">
                  <div class="flex-1">
                    <p class="text-xs text-[#7C9082] mb-1">{{ item.publish_date | date:'mediumDate' }}</p>
                    <h3 class="text-base font-semibold text-[#2D3436]">{{ item.title }}</h3>
                    <p class="text-sm text-[#5A6B5E] mt-1 line-clamp-2">{{ item.excerpt }}</p>
                  </div>
                  <a [routerLink]="'/NewsDetail'" [queryParams]="{id: item.id}"
                     class="shrink-0 text-sm font-medium text-[#7C9082] hover:text-[#5A6B5E] transition-colors">
                    Read more →
                  </a>
                </div>
              }
            </div>
          }
        </div>
      </section>
    </div>
  `,
})
export class ArchiveComponent implements OnInit {
  private service = inject(NewsService);
  news = signal<NewsItem[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.service.getArchived().subscribe(data => { this.news.set(data); this.loading.set(false); });
  }
}

