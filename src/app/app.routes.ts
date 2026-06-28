import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'About',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'Members',
    loadComponent: () => import('./pages/members/members.component').then(m => m.MembersComponent),
  },
  {
    path: 'SisterProjects',
    loadComponent: () => import('./pages/sister-projects/sister-projects.component').then(m => m.SisterProjectsComponent),
  },
  {
    path: 'News',
    loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent),
  },
  {
    path: 'NewsDetail',
    loadComponent: () => import('./pages/news-detail/news-detail.component').then(m => m.NewsDetailComponent),
  },
  {
    path: 'Archive',
    loadComponent: () => import('./pages/archive/archive.component').then(m => m.ArchiveComponent),
  },
  {
    path: 'Resources',
    loadComponent: () => import('./pages/resources/resources.component').then(m => m.ResourcesComponent),
  },
  {
    path: 'Collaborate',
    loadComponent: () => import('./pages/collaborate/collaborate.component').then(m => m.CollaborateComponent),
  },
  {
    path: 'Contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'Privacy',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent),
  },
  {
    path: 'Terms',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];

