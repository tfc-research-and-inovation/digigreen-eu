import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NavItem} from '../../models/nav-item';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  mobileMenuOpen = signal(false);
  openDropdown = signal<string | null>(null);

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

  parseParams(params: string): Record<string, string> {
    const result: Record<string, string> = {};
    const search = new URLSearchParams(params.replace(/^\?/, ''));
    search.forEach((v, k) => { result[k] = v; });
    return result;
  }

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
        // { name: 'Data & DMP', route: '/resources', params: '?type=Data %26 DMP' },
      ],
    },
    { name: 'News', route: '/news' },
    { name: 'Archive', route: '/archive' },
    { name: 'DigiGreenTT Projects', route: '/digigreentt-projects' },
    { name: 'Collaborate', route: '/collaborate' },
    {
      name: 'Ecosystem',
      dropdown: [
        { name: 'Tools', route: '/tools' },
        // { name: 'Webinars', route: '/webinars' },
        // { name: 'Videos', route: '/videos' },
        // { name: 'Podcasts', route: '/podcasts' },
        { name: 'Members', route: '/members' }, // maybe keep tha cards and change css
      ],
    },
    { name: 'Contact', route: '/contact' },
  ];
}
