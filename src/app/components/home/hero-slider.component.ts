import { Component, OnInit, OnDestroy, signal } from '@angular/core';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80',
    alt: 'Green energy transition',
  },
  {
    image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80',
    alt: 'Digital innovation',
  },
  {
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    alt: 'Community collaboration',
  },
];

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  template: `
    <div class="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
      @for (slide of slides; track slide.alt; let i = $index) {
        <img
          [src]="slide.image"
          [alt]="slide.alt"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          [class.opacity-100]="current() === i"
          [class.opacity-0]="current() !== i"
        />
      }
      <!-- Dots -->
      <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        @for (slide of slides; track slide.alt; let i = $index) {
          <button
            (click)="goTo(i)"
            [class.bg-white]="current() === i"
            [class.bg-white/50]="current() !== i"
            class="w-2 h-2 rounded-full transition-colors"
            [attr.aria-label]="'Slide ' + (i+1)">
          </button>
        }
      </div>
    </div>
  `,
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  readonly slides = slides;
  current = signal(0);
  private interval: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.current.update(c => (c + 1) % this.slides.length);
    }, 4000);
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  goTo(i: number) {
    this.current.set(i);
  }
}

