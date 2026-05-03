import { Component, Input } from '@angular/core';
import { Event } from '../../models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events-teaser',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="bg-white rounded-2xl border border-[#E8E4DC] p-6 md:p-8 flex flex-col">
      <h3 class="text-lg font-semibold text-[#2D3436] mb-4">Upcoming Events</h3>
      @if (events.length === 0) {
        <p class="text-sm text-[#7C9082] flex-1">No upcoming events at this time.</p>
      } @else {
        <ul class="space-y-4 flex-1">
          @for (event of events; track event.id) {
            <li class="border-b border-[#E8E4DC] pb-4 last:border-0 last:pb-0 flex gap-3">
              <div class="shrink-0 w-12 text-center bg-[#F5F3EF] rounded-lg py-1 px-2">
                <p class="text-xs text-[#7C9082] uppercase">{{ event.event_date | date:'MMM' }}</p>
                <p class="text-lg font-semibold text-[#2D3436] leading-none">{{ event.event_date | date:'d' }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-[#2D3436] line-clamp-2">{{ event.title }}</p>
                @if (event.location) {
                  <p class="text-xs text-[#7C9082] mt-0.5">{{ event.location }}</p>
                }
              </div>
            </li>
          }
        </ul>
      }
    </div>
  `,
})
export class EventsTeaserComponent {
  @Input() events: Event[] = [];
}

