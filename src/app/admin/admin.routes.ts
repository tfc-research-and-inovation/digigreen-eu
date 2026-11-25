import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/admin-login').then(m => m.AdminLogin),
  },
  {
    path: '',
    loadComponent: () => import('./shell/admin-shell').then(m => m.AdminShell),
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/admin-dashboard').then(m => m.AdminDashboard),
      },
      {
        path: 'news',
        loadComponent: () => import('./news/admin-news').then(m => m.AdminNews),
      },
      {
        path: 'news/:id',
        loadComponent: () => import('./news/admin-news-edit').then(m => m.AdminNewsEdit),
      },
      {
        path: 'resources',
        loadComponent: () => import('./resources/admin-resources').then(m => m.AdminResources),
      },
      {
        path: 'resources/:id',
        loadComponent: () => import('./resources/admin-resource-edit').then(m => m.AdminResourceEdit),
      },
      {
        path: 'projects',
        loadComponent: () => import('./projects/admin-projects').then(m => m.AdminProjects),
      },
      {
        path: 'projects/:id',
        loadComponent: () => import('./projects/admin-project-edit').then(m => m.AdminProjectEdit),
      },
    ],
  },
];
