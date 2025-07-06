import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent implements OnInit, OnDestroy {

  constructor(
    private seoService: SEOService,
    private structuredDataService: StructuredDataService
  ) {}

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Política de Privacidad - Gargurevich.Dev | Protección de Datos',
      description: 'Conoce cómo protegemos tu información personal en Gargurevich.Dev. Política de privacidad completa para servicios de desarrollo web y consultoría.',
      keywords: 'política de privacidad, protección de datos, RGPD, gargurevich dev, confidencialidad',
      url: 'https://gargurevich.dev/privacy',
      type: 'website'
    });

    this.addStructuredData();
  }

  ngOnDestroy(): void {
    this.structuredDataService.removeStructuredData();
  }

  private addStructuredData(): void {
    this.structuredDataService.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Política de Privacidad - Gargurevich.Dev',
      description: 'Política de privacidad y protección de datos personales',
      url: 'https://gargurevich.dev/privacy',
      dateModified: '2025-07-05',
      inLanguage: 'es-PE',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Gargurevich.Dev',
        url: 'https://gargurevich.dev'
      },
      mainEntity: {
        '@type': 'PrivacyPolicy',
        name: 'Política de Privacidad de Gargurevich.Dev',
        text: 'Cómo recopilamos, usamos y protegemos tu información personal',
        dateModified: '2025-07-05'
      }
    });
  }
}
