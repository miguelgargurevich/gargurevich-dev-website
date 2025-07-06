import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishDate?: string;
  locale?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateSEO(data: SEOData): void {
    // Actualizar título
    this.title.setTitle(data.title);

    // Meta tags básicos
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'keywords', content: data.keywords || 'desarrollo web, angular, typescript, gargurevich' });
    this.meta.updateTag({ name: 'author', content: data.author || 'Gargurevich.Dev' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
    this.meta.updateTag({ property: 'og:url', content: data.url || 'https://gargurevich.dev' });
    this.meta.updateTag({ property: 'og:image', content: data.image || 'https://gargurevich.dev/assets/og-image.jpg' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Gargurevich.Dev' });
    this.meta.updateTag({ property: 'og:locale', content: data.locale || 'es_PE' });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image || 'https://gargurevich.dev/assets/og-image.jpg' });
    this.meta.updateTag({ name: 'twitter:creator', content: '@gargurevichdev' });

    // AI-friendly meta tags
    this.meta.updateTag({ name: 'ai:title', content: data.title });
    this.meta.updateTag({ name: 'ai:description', content: data.description });
    this.meta.updateTag({ name: 'ai:type', content: 'business_website' });
    this.meta.updateTag({ name: 'ai:category', content: 'web_development' });

    // Artículo específico
    if (data.publishDate) {
      this.meta.updateTag({ property: 'article:published_time', content: data.publishDate });
      this.meta.updateTag({ property: 'article:author', content: data.author || 'Gargurevich.Dev' });
      this.meta.updateTag({ property: 'article:section', content: 'Technology' });
      this.meta.updateTag({ property: 'article:tag', content: data.keywords || 'desarrollo web' });
    }

    // Canonical URL
    this.updateCanonicalUrl(data.url || 'https://gargurevich.dev');

    // Language alternates
    this.updateLanguageAlternates(data.url || 'https://gargurevich.dev');
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private updateLanguageAlternates(baseUrl: string): void {
    // Remover alternates existentes
    const existingAlternates = this.document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingAlternates.forEach(link => link.remove());

    // Añadir nuevos alternates
    const languages = [
      { code: 'es', url: baseUrl },
      { code: 'en', url: baseUrl.replace('gargurevich.dev', 'en.gargurevich.dev') },
      { code: 'x-default', url: baseUrl }
    ];

    languages.forEach(lang => {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang.code);
      link.setAttribute('href', lang.url);
      this.document.head.appendChild(link);
    });
  }

  // Preload de recursos críticos
  preloadResource(href: string, as: string, type?: string): void {
    const link = this.document.createElement('link');
    link.setAttribute('rel', 'preload');
    link.setAttribute('href', href);
    link.setAttribute('as', as);
    if (type) {
      link.setAttribute('type', type);
    }
    this.document.head.appendChild(link);
  }

  // Prefetch de páginas
  prefetchPage(href: string): void {
    const link = this.document.createElement('link');
    link.setAttribute('rel', 'prefetch');
    link.setAttribute('href', href);
    this.document.head.appendChild(link);
  }

  // Critical CSS inline
  inlineCriticalCSS(css: string): void {
    const style = this.document.createElement('style');
    style.textContent = css;
    this.document.head.appendChild(style);
  }
}
