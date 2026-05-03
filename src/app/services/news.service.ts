import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { NewsItem } from '../models';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);
  private url = '/data/news.json';

  getAll(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(this.url);
  }

  getPublished(): Observable<NewsItem[]> {
    return this.getAll().pipe(
      map(items => items.filter(n => n.is_published && !n.is_archived)
        .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()))
    );
  }

  getLatest(count: number): Observable<NewsItem[]> {
    return this.getPublished().pipe(map(items => items.slice(0, count)));
  }

  getArchived(): Observable<NewsItem[]> {
    return this.getAll().pipe(
      map(items => items.filter(n => n.is_archived)
        .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()))
    );
  }

  getById(id: string): Observable<NewsItem | undefined> {
    return this.getAll().pipe(map(items => items.find(n => n.id === id)));
  }
}

