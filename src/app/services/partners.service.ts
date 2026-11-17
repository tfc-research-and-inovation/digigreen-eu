import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, map, of, from} from 'rxjs';
import { Partner } from '../models';
import { Supabase } from "./supabase";

@Injectable({ providedIn: 'root' })
export class PartnersService {
  private http = inject(HttpClient);
  private readonly supabaseService = inject(Supabase);
  private url = '/data/partners.json';

  getAll(): Observable<Partner[]> {
    return from(this.supabaseService.client.from('partners').select('*'))
      .pipe(
        map(({data, error}) => {
          if (error) {
            console.error(error)
            throw error
          }
          return data
        })
      )
    // return this.http.get<Partner[]>(this.url).pipe(
    //   map(items => items.sort((a, b) => a.order - b.order))
    // );
  }
}

