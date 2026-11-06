import {Component, OnInit, signal} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit{

  cookieConsent = signal(false);

  readonly quickLinks = [
    { label: 'About', path: '/about' },
    { label: 'DigiGreenTT Cluster', path: '/digigreentt-projects' },
    { label: 'News', path: '/news' },
    { label: 'Collaborate', path: '/collaborate' }
  ];

  readonly resourceFooterLinks = [
    { label: 'Deliverables', type: 'Deliverable' },
    { label: 'Publications', type: 'Publication' },
    { label: 'Policy Briefs', type: 'Policy Brief' },
    { label: 'Better Practice Guides', type: 'Better Practice Guide' },
  ];

  currentYear = new Date().getFullYear();

  ngOnInit() {
    const consent = localStorage.getItem('digigreentt-cookie-consent');
    this.cookieConsent.set(!!consent);
  }

  acceptCookies() {
    localStorage.setItem('digigreentt-cookie-consent', 'true');
    this.cookieConsent.set(true);
  }

}
