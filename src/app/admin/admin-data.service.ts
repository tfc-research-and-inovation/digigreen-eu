import { Injectable, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Supabase } from '../services/supabase';
import { Tables } from '../types/database.types';

export type AdminTable = 'news' | 'resources' | 'projects';
export const PAGE_SIZE = 10;

@Injectable({ providedIn: 'root' })
export class AdminDataService {
  private readonly client = inject(Supabase).client;

  /** One page of rows, newest first, plus the total row count. */
  page<T extends AdminTable>(table: T, page: number): Observable<{ rows: Tables<T>[]; total: number }> {
    const start = page * PAGE_SIZE;
    return from(
      this.client
        .from(table)
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(start, start + PAGE_SIZE - 1),
    ).pipe(
      map(({ data, count, error }) => {
        if (error) {
          console.error(error);
          throw error;
        }
        return { rows: data as Tables<T>[], total: count ?? 0 };
      }),
    );
  }

  getById<T extends AdminTable>(table: T, id: string): Observable<Tables<T>> {
    return from(this.client.from(table as AdminTable).select('*').eq('id', id).single()).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error(error);
          throw error;
        }
        return data as Tables<T>;
      }),
    );
  }

  update(table: AdminTable, id: string, patch: Record<string, unknown>): Observable<void> {
    return from(this.client.from(table as AdminTable).update(patch as never).eq('id', id)).pipe(
      map(({ error }) => {
        if (error) {
          console.error(error);
          throw error;
        }
      }),
    );
  }
}
