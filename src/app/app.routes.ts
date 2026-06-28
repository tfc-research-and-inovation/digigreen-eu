import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'members',
    loadComponent: () => import('./pages/members/members.component').then(m => m.MembersComponent),
  },
  {
    path: 'sisterProjects',
    loadComponent: () => import('./pages/sister-projects/sister-projects.component').then(m => m.SisterProjectsComponent),
  },
  {
    path: 'news',
    loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent),
  },
  {
    path: 'NewsDetail',
    loadComponent: () => import('./pages/news-detail/news-detail.component').then(m => m.NewsDetailComponent),
  },
  {
    path: 'archive',
    loadComponent: () => import('./pages/archive/archive.component').then(m => m.ArchiveComponent),
  },
  {
    path: 'resources',
    loadComponent: () => import('./pages/resources/resources.component').then(m => m.ResourcesComponent),
  },
  {
    path: 'collaborate',
    loadComponent: () => import('./pages/collaborate/collaborate.component').then(m => m.CollaborateComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent),
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];

