import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { EventsService } from '../../services/events.service';
import { NewsItem, Event } from '../../models';
import { HeroSliderComponent } from '../../components/home/hero-slider.component';
import { StatsStripComponent } from '../../components/home/stats-strip.component';
import { TeaserCardComponent } from '../../components/home/teaser-card.component';
import { NewsTeaserComponent } from '../../components/home/news-teaser.component';
import { EventsTeaserComponent } from '../../components/home/events-teaser.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    HeroSliderComponent, StatsStripComponent,
    TeaserCardComponent, NewsTeaserComponent, EventsTeaserComponent,
  ],
  template: `
    <div>
      <!-- Hero -->
      <section class="bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div class="order-2 lg:order-1">
              <p class="text-sm font-medium text-[#7C9082] uppercase tracking-wider mb-4">Horizon Europe Project</p>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2D3436] tracking-tight leading-tight">
                Supporting Fair Twin Transition for All
              </h1>
              <p class="mt-6 text-lg text-[#5A6B5E] leading-relaxed max-w-xl">
                Advancing social justice to reduce inequality in Europe's green and digital transitions.
              </p>
              <div class="mt-8 flex flex-col sm:flex-row gap-4">
                <a routerLink="/Collaborate"
                   class="inline-flex items-center justify-center gap-2 bg-[#C67B5C] hover:bg-[#A5614A] text-white px-6 py-3 rounded-lg text-base font-medium transition-colors">
                  Propose a Joint Activity
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
                <a routerLink="/Collaborate" [queryParams]="{tab:'network'}"
                   class="inline-flex items-center justify-center gap-2 border border-[#7C9082] text-[#7C9082] hover:bg-[#7C9082]/10 px-6 py-3 rounded-lg text-base font-medium transition-colors">
                  Join the Sister Project Network
                </a>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <app-hero-slider />
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="bg-[#F5F3EF] py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <app-stats-strip />
        </div>
      </section>

      <!-- Teasers -->
      <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
            <app-teaser-card
              title="What is the Sister Project Engagement"
              description="Digi Green TT connects Horizon Europe projects working on fair, inclusive green and digital transitions to enable cross-learning, collaboration, and joint activities."
              linkText="Learn more"
              linkPage="SisterProjects"
            />
            <app-events-teaser [events]="events()" />
            <app-news-teaser [news]="news()" />
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bg-[#2D3436] py-16 md:py-20">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-semibold text-white tracking-tight">Ready to collaborate?</h2>
          <p class="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Join our network of Horizon Europe projects and contribute to a fair digital and green twin transition for all Europeans.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/Collaborate"
               class="inline-flex items-center justify-center gap-2 bg-[#C67B5C] hover:bg-[#A5614A] text-white px-8 py-3 rounded-lg text-base font-medium transition-colors">
              Get Involved
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
            <a routerLink="/SisterProjects"
               class="inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg text-base font-medium transition-colors">
              View Sister Projects
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  private newsService = inject(NewsService);
  private eventsService = inject(EventsService);

  news = signal<NewsItem[]>([]);
  events = signal<Event[]>([]);

  ngOnInit() {
    this.newsService.getLatest(3).subscribe(n => this.news.set(n));
    this.eventsService.getUpcoming(3).subscribe(e => this.events.set(e));
  }
}

