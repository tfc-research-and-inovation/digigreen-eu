import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Resource } from '../models';

@Injectable({ providedIn: 'root' })
export class ResourcesService {
  private http = inject(HttpClient);
  private url = '/data/resources.json';

  getAll(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.url).pipe(
      map(items => items
        .filter(r => r.is_published)
        .sort((a, b) => {
          if (!a.publish_date) return 1;
          if (!b.publish_date) return -1;
          return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
        })
      )
    );
  }

  getByType(type: string): Observable<Resource[]> {
    return this.getAll().pipe(
      map(items => type === 'all' ? items : items.filter(r => r.resource_type === type))
    );
  }
}

