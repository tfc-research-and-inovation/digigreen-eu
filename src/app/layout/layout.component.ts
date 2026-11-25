import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';
import {Footer} from '../components/footer/footer';
import {Header} from '../components/header/header';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Footer, Header],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  private readonly router = inject(Router);

  protected readonly isAdmin = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects.startsWith('/admin')),
    ),
    { initialValue: false },
  );
}
