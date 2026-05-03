import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Partner } from '../models';

@Injectable({ providedIn: 'root' })
export class PartnersService {
  private http = inject(HttpClient);
  private url = '/data/partners.json';

  getAll(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.url).pipe(
      map(items => items.sort((a, b) => a.order - b.order))
    );
  }
}

