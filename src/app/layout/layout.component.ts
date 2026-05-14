import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavSubItem {
  name: string;
  route: string;
  params?: string;
}

interface NavItem {
  name: string;
  route?: string;
  dropdown?: NavSubItem[];
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  mobileMenuOpen = signal(false);
  cookieConsent = signal(true);
  openDropdown = signal<string | null>(null);

  readonly navItems: NavItem[] = [
    { name: 'Home', route: '/Home' },
    { name: 'About', route: '/About' },
    {
      name: 'Resources',
      dropdown: [
        { name: 'Deliverables', route: '/Resources', params: '?type=Deliverable' },
        { name: 'Publications', route: '/Resources', params: '?type=Publication' },
        { name: 'Better Practice Guides', route: '/Resources', params: '?type=Better Practice Guide' },
        { name: 'Policy Briefs', route: '/Resources', params: '?type=Policy Brief' },
        { name: 'Data & DMP', route: '/Resources', params: '?type=Data %26 DMP' },
      ],
    },
    { name: 'News', route: '/News' },
    { name: 'Archive', route: '/Archive' },
    { name: 'Sister Projects', route: '/SisterProjects' },
    { name: 'Collaborate', route: '/Collaborate' },
    { name: 'Contact', route: '/Contact' },
  ];

  ngOnInit() {
    const consent = localStorage.getItem('fitter-cookie-consent');
    this.cookieConsent.set(!!consent);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  toggleDropdown(name: string) {
    this.openDropdown.update(v => v === name ? null : name);
  }

  closeDropdown() {
    this.openDropdown.set(null);
  }

  acceptCookies() {
    localStorage.setItem('fitter-cookie-consent', 'true');
    this.cookieConsent.set(true);
  }

  currentYear = new Date().getFullYear();

  readonly resourceFooterLinks = [
    { label: 'Deliverables', type: 'Deliverable' },
    { label: 'Publications', type: 'Publication' },
    { label: 'Policy Briefs', type: 'Policy Brief' },
    { label: 'Better Practice Guides', type: 'Better Practice Guide' },
  ];

  parseParams(params: string): Record<string, string> {
    const result: Record<string, string> = {};
    const search = new URLSearchParams(params.replace(/^\?/, ''));
    search.forEach((v, k) => { result[k] = v; });
    return result;
  }
}


