import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'brief/landing-page',
    loadComponent: () => import('./components/briefs/brief-landing-page.component').then(m => m.BriefLandingPageComponent)
  },
  {
    path: 'brief/website',
    loadComponent: () => import('./components/briefs/brief-website.component').then(m => m.BriefWebsiteComponent)
  },
  {
    path: 'brief/web-scalable',
    loadComponent: () => import('./components/briefs/brief-web-scalable.component').then(m => m.BriefWebScalableComponent)
  },
  {
    path: 'brief/ecommerce',
    loadComponent: () => import('./components/briefs/brief-ecommerce.component').then(m => m.BriefEcommerceComponent)
  },
  {
    path: 'brief/custom-app',
    loadComponent: () => import('./components/briefs/brief-custom-app.component').then(m => m.BriefCustomAppComponent)
  },
  {
    path: 'brief/ai-integration',
    loadComponent: () => import('./components/briefs/brief-ai-integration.component').then(m => m.BriefAiIntegrationComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./components/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'cases',
    loadComponent: () => import('./components/cases/cases.component').then(m => m.CasesComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./components/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('./components/blog/blog-article.component').then(m => m.BlogArticleComponent)
  },
  {
    path: 'team',
    loadComponent: () => import('./components/team/team.component').then(m => m.TeamComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./components/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./components/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
