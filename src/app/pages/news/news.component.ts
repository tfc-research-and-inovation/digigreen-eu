import { Component, OnInit, inject, signal } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsItem } from '../../models';
import { PageHeaderComponent } from '../../components/shared/page-header.component';
import { NewsCardComponent } from '../../components/news/news-card.component';
import { LoadingStateComponent } from '../../components/shared/loading-state.component';
import { EmptyStateComponent } from '../../components/shared/empty-state.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [PageHeaderComponent, NewsCardComponent, LoadingStateComponent, EmptyStateComponent],
  template: `
    <div>
      <app-page-header title="News" subtitle="Latest news and updates from the FITTER-EU project." breadcrumb="News"/>
      <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          @if (loading()) {
            <app-loading-state message="Loading news…"/>
          } @else if (news().length === 0) {
            <app-empty-state title="No news yet" message="News items will appear here as the project progresses."/>
          } @else {
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              @for (item of news(); track item.id) {
                <app-news-card [item]="item"/>
              }
            </div>
          }
        </div>
      </section>
    </div>
  `,
})
export class NewsComponent implements OnInit {
  private service = inject(NewsService);
  news = signal<NewsItem[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.service.getPublished().subscribe(data => { this.news.set(data); this.loading.set(false); });
  }
}

