import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Event } from '../models';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private http = inject(HttpClient);
  private url = '/data/events.json';

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url);
  }

  getUpcoming(count?: number): Observable<Event[]> {
    return this.getAll().pipe(
      map(items => {
        const upcoming = items
          .filter(e => e.is_upcoming)
          .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
        return count ? upcoming.slice(0, count) : upcoming;
      })
    );
  }
}

