import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { NewsItem } from '../../models';
import { LoadingStateComponent } from '../../components/shared/loading-state.component';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [RouterLink, LoadingStateComponent],
  template: `
    <div>
      @if (loading()) {
        <app-loading-state message="Loading article…"/>
      } @else if (!item()) {
        <div class="max-w-3xl mx-auto px-4 py-24 text-center">
          <h2 class="text-2xl font-semibold text-[#2D3436] mb-4">Article not found</h2>
          <a routerLink="/News" class="text-[#7C9082] hover:underline">← Back to News</a>
        </div>
      } @else {
        <section class="bg-[#2D3436] text-white py-12 md:py-16">
          <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <a routerLink="/News" class="text-sm text-[#7C9082] hover:text-white transition-colors mb-4 inline-block">← Back to News</a>
            <div class="flex flex-wrap gap-2 mb-4">
              @for (tag of (item()!.tags ?? []); track tag) {
                <span class="px-2 py-0.5 text-xs bg-[#7C9082]/20 text-[#7C9082] rounded-full">{{ tag }}</span>
              }
            </div>
            <h1 class="text-3xl md:text-4xl font-semibold tracking-tight">{{ item()!.title }}</h1>
            <p class="mt-3 text-gray-300 text-sm">{{ formatDate(item()!.publish_date) }}</p>
          </div>
        </section>
        @if (item()!.image_url) {
          <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <img [src]="item()!.image_url" [alt]="item()!.image_alt || item()!.title"
                 class="w-full rounded-xl shadow-md object-cover max-h-80"/>
          </div>
        }
        <section class="py-12">
          <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p class="text-lg text-[#5A6B5E] leading-relaxed mb-8 font-medium">{{ item()!.excerpt }}</p>
            @if (item()!.content) {
              <div class="prose prose-slate max-w-none text-[#2D3436] whitespace-pre-wrap leading-relaxed">{{ item()!.content }}</div>
            }
          </div>
        </section>
      }
    </div>
  `,
})
export class NewsDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(NewsService);

  item = signal<NewsItem | undefined>(undefined);
  loading = signal(true);

  formatDate(dateStr: string): string {
    try {
      return format(parseISO(dateStr), 'MMMM d, yyyy');
    } catch {
      return dateStr;
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.service.getById(id).subscribe(data => { this.item.set(data); this.loading.set(false); });
      } else {
        this.loading.set(false);
      }
    });
  }
}

