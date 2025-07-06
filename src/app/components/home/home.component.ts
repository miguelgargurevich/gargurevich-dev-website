import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface Stat {
  number: string;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  services: Service[] = [
    {
      icon: 'landing-page',
      title: 'Landing Pages',
      description: 'Páginas de conversión directa optimizadas para captar leads y generar ventas.',
      features: ['Diseño responsive', 'Alta conversión', 'SEO optimizado', 'Hosting incluido']
    },
    {
      icon: 'website',
      title: 'Sitios Web Institucionales',
      description: 'Presencia digital profesional para tu marca o negocio.',
      features: ['Diseño moderno', 'CMS integrado', 'Múltiples idiomas', 'Soporte técnico']
    },
    {
      icon: 'web-scalable',
      title: 'Webs Escalables',
      description: 'Soluciones intermedias con gestión de contenido y funcionalidades avanzadas.',
      features: ['CMS headless', 'Blog integrado', 'Portafolio dinámico', 'API REST']
    },
    {
      icon: 'ecommerce',
      title: 'E-commerce',
      description: 'Tiendas online modernas con gestión completa de productos y pagos.',
      features: ['Carrito avanzado', 'Pagos seguros', 'Inventario', 'Analytics']
    },
    {
      icon: 'custom-app',
      title: 'Apps a Medida',
      description: 'Aplicaciones web empresariales diseñadas específicamente para tu negocio.',
      features: ['Lógica personalizada', 'Integración APIs', 'Dashboard admin', 'Reportes']
    },
    {
      icon: 'ai-integration',
      title: 'IA & DevOps',
      description: 'Integración de inteligencia artificial y automatización de despliegues.',
      features: ['CI/CD automático', 'IA integrada', 'Monitoreo 24/7', 'Escalabilidad']
    }
  ];

  stats: Stat[] = [
    { number: '50+', label: 'Proyectos Completados' },
    { number: '100%', label: 'Clientes Satisfechos' },
    { number: '24/7', label: 'Soporte Técnico' },
    { number: '3 años', label: 'de Experiencia' }
  ];
}
