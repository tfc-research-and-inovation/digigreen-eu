import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/shared/page-header.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './terms.component.html',
})
export class TermsComponent {}

