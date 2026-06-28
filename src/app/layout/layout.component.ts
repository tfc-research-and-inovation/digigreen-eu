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
  cookieConsent = signal(false);
  openDropdown = signal<string | null>(null);

  readonly navItems: NavItem[] = [
    { name: 'Home', route: '/' },
    { name: 'About', route: '/about' },
    {
      name: 'Resources',
      dropdown: [
        { name: 'Deliverables', route: '/resources', params: '?type=Deliverable' },
        { name: 'Publications', route: '/resources', params: '?type=Publication' },
        { name: 'Better Practice Guides', route: '/resources', params: '?type=Better Practice Guide' },
        { name: 'Policy Briefs', route: '/resources', params: '?type=Policy Brief' },
        // { name: 'Data & DMP', route: '/Resources', params: '?type=Data %26 DMP' },
      ],
    },
    { name: 'News', route: '/news' },
    { name: 'Archive', route: '/archive' },
    { name: 'Sister Projects', route: '/sisterProjects' },
    { name: 'Collaborate', route: '/collaborate' },
    { name: 'Contact', route: '/contact' },
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


