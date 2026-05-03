import { Component } from '@angular/core';

const stats = [
  { value: '12', label: 'Partner Countries' },
  { value: '36', label: 'Project Months' },
  { value: '8', label: 'Work Packages' },
  { value: '20+', label: 'Sister Projects' },
];

@Component({
  selector: 'app-stats-strip',
  standalone: true,
  template: `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      @for (stat of stats; track stat.label) {
        <div>
          <p class="text-3xl md:text-4xl font-semibold text-[#2D3436]">{{ stat.value }}</p>
          <p class="mt-1 text-sm text-[#7C9082]">{{ stat.label }}</p>
        </div>
      }
    </div>
  `,
})
export class StatsStripComponent {
  readonly stats = stats;
}

