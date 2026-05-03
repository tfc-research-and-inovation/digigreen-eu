import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SisterProject } from '../models';

@Injectable({ providedIn: 'root' })
export class SisterProjectsService {
  private http = inject(HttpClient);
  private url = '/data/sister-projects.json';

  getAll(): Observable<SisterProject[]> {
    return this.http.get<SisterProject[]>(this.url).pipe(
      map(items => items.sort((a, b) => a.order - b.order))
    );
  }
}

