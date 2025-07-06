import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent implements OnInit, OnDestroy {

  constructor(
    private seoService: SEOService,
    private structuredDataService: StructuredDataService
  ) {}

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Términos de Servicio - Gargurevich.Dev | Desarrollo Web',
      description: 'Términos y condiciones para servicios de desarrollo web, aplicaciones y consultoría tecnológica. Conoce nuestras políticas de proyecto, pago y garantías.',
      keywords: 'términos de servicio, condiciones, desarrollo web, gargurevich dev, contratos, garantías',
      url: 'https://gargurevich.dev/terms',
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
      name: 'Términos de Servicio - Gargurevich.Dev',
      description: 'Términos y condiciones para servicios de desarrollo web y consultoría tecnológica',
      url: 'https://gargurevich.dev/terms',
      dateModified: '2025-07-05',
      inLanguage: 'es-PE',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Gargurevich.Dev',
        url: 'https://gargurevich.dev'
      },
      mainEntity: {
        '@type': 'TermsOfService',
        name: 'Términos de Servicio de Gargurevich.Dev',
        text: 'Condiciones generales para el uso de nuestros servicios de desarrollo web',
        dateModified: '2025-07-05'
      }
    });
  }
}
