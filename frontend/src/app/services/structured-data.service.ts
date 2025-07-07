import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class StructuredDataService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  addStructuredData(data: StructuredData): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  removeStructuredData(): void {
    const scripts = this.document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(script => script.remove());
  }

  // Structured data para la organización
  addOrganizationData(): void {
    const organizationData: StructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Gargurevich.Dev',
      url: 'https://gargurevich.dev',
      logo: 'https://gargurevich.dev/assets/logo.png',
      description: 'Empresa especializada en desarrollo web de alta calidad. Creamos soluciones digitales modernas y escalables.',
      email: 'hola@gargurevich.dev',
      telephone: '+51-1-234-5678',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lima',
        addressCountry: 'PE'
      },
      foundingDate: '2024',
      numberOfEmployees: '1-10',
      areaServed: ['PE', 'LATAM'],
      serviceType: [
        'Web Development',
        'E-commerce Development',
        'Landing Pages',
        'Web Applications',
        'DevOps Integration'
      ],
      sameAs: [
        'https://linkedin.com/company/gargurevich-dev',
        'https://github.com/gargurevich-dev'
      ]
    };
    this.addStructuredData(organizationData);
  }

  // Structured data para servicios
  addServiceData(serviceName: string, description: string, price?: string): void {
    const serviceData: StructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceName,
      description: description,
      provider: {
        '@type': 'Organization',
        name: 'Gargurevich.Dev',
        url: 'https://gargurevich.dev'
      },
      areaServed: ['PE', 'LATAM'],
      serviceType: 'Web Development',
      ...(price && { priceRange: price })
    };
    this.addStructuredData(serviceData);
  }

  // Structured data para artículos de blog
  addArticleData(title: string, description: string, author: string, publishDate: string, image?: string): void {
    const articleData: StructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description,
      author: {
        '@type': 'Person',
        name: author
      },
      publisher: {
        '@type': 'Organization',
        name: 'Gargurevich.Dev',
        logo: {
          '@type': 'ImageObject',
          url: 'https://gargurevich.dev/assets/logo.png'
        }
      },
      datePublished: publishDate,
      dateModified: publishDate,
      ...(image && { image: image })
    };
    this.addStructuredData(articleData);
  }

  // Structured data para página web
  addWebPageData(name: string, description: string, url: string): void {
    const webPageData: StructuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: name,
      description: description,
      url: url,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Gargurevich.Dev',
        url: 'https://gargurevich.dev'
      },
      about: {
        '@type': 'Organization',
        name: 'Gargurevich.Dev'
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://gargurevich.dev/assets/hero-image.jpg'
      }
    };
    this.addStructuredData(webPageData);
  }

  // FAQ Structured Data
  addFAQData(faqs: Array<{question: string, answer: string}>): void {
    const faqData: StructuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
    this.addStructuredData(faqData);
  }
}
