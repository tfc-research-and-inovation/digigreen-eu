import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Footer} from '../components/footer/footer';
import {Header} from '../components/header/header';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Footer, Header],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
}


