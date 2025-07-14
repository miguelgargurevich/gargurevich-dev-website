import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

interface ServiceDetail {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  technologies: string[];
  category: string;
  price: string;
  duration: string;
  includesHosting: boolean;
  includesSupport: boolean;
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  selectedCategory = 'all';
  
  categories: ServiceCategory[] = [
    { id: 'all', name: 'Todos los Servicios', description: 'Ver toda nuestra gama de servicios' },
    { id: 'web', name: 'Desarrollo Web', description: 'Sitios web y aplicaciones modernas' },
    { id: 'ecommerce', name: 'E-commerce', description: 'Tiendas online y sistemas de venta' },
    { id: 'custom', name: 'Desarrollo a Medida', description: 'Soluciones personalizadas' },

  ];

  services: ServiceDetail[] = [
    {
      id: 'landing-page',
      icon: 'landing-page',
      title: 'Landing Pages',
      subtitle: 'Páginas de conversión directa',
      description: 'Diseñamos landing pages optimizadas para convertir visitantes en clientes. Cada página está estratégicamente diseñada para maximizar las conversiones y generar leads de calidad.',
      features: [
        'Diseño responsive y mobile-first',
        'Optimización para conversiones (CRO)',
        'SEO técnico y de contenido',
        'Integración con herramientas de analytics',
        'Formularios de contacto optimizados',
        'Velocidad de carga optimizada',
        'Hosting y dominio incluido por 1 año'
      ],
      technologies: ['Angular', 'SCSS', 'TypeScript', 'Google Analytics', 'GTM'],
      category: 'web',
      price: 'Cotizar',
      duration: '1-2 semanas',
      includesHosting: true,
      includesSupport: true
    },
    {
      id: 'institutional-web',
      icon: 'website',
      title: 'Sitios Web Institucionales',
      subtitle: 'Presencia digital profesional',
      description: 'Sitios web corporativos que reflejan la profesionalidad de tu marca. Incluyen gestión de contenido, múltiples páginas y funcionalidades avanzadas para empresas.',
      features: [
        'Diseño corporativo personalizado',
        'Sistema de gestión de contenido (CMS)',
        'Múltiples páginas y secciones',
        'Blog integrado opcional',
        'Galería de imágenes y videos',
        'Formularios de contacto avanzados',
        'SEO completo y sitemap',
        'Soporte multiidioma'
      ],
      technologies: ['Angular', 'Strapi CMS', 'Node.js', 'PostgreSQL', 'AWS'],
      category: 'web',
      price: 'Cotizar',
      duration: '2-4 semanas',
      includesHosting: true,
      includesSupport: true
    },
    {
      id: 'ecommerce-basic',
      icon: 'ecommerce',
      title: 'Tienda Online Básica',
      subtitle: 'E-commerce para emprendedores',
      description: 'Tienda online completa con gestión de productos, carrito de compras y pasarela de pagos. Ideal para emprendedores que quieren vender online.',
      features: [
        'Catálogo de productos ilimitado',
        'Carrito de compras avanzado',
        'Pasarela de pagos segura',
        'Gestión de inventario',
        'Panel de administración',
        'Reportes de ventas',
        'Integración con redes sociales',
        'SEO para e-commerce'
      ],
      technologies: ['Angular', 'WooCommerce', 'Stripe', 'PayPal', 'MySQL'],
      category: 'ecommerce',
      price: 'Cotizar',
      duration: '3-5 semanas',
      includesHosting: true,
      includesSupport: true
    },
    {
      id: 'custom-app',
      icon: 'custom-app',
      title: 'Aplicación Web a Medida',
      subtitle: 'Solución personalizada para tu negocio',
      description: 'Desarrollamos aplicaciones web completamente personalizadas según las necesidades específicas de tu negocio, con funcionalidades únicas y lógica empresarial compleja.',
      features: [
        'Análisis y diseño de requisitos',
        'Desarrollo de lógica personalizada',
        'Dashboard de administración',
        'Gestión de usuarios y roles',
        'Reportes y analytics personalizados',
        'Integración con APIs externas',
        'Seguridad avanzada',
        'Documentación técnica completa'
      ],
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
      category: 'custom',
      price: 'Cotizar',
      duration: '6-12 semanas',
      includesHosting: true,
      includesSupport: true
    },
    {
      id: 'ai-integration',
      icon: 'ai-integration',
      title: 'Integración con IA',
      subtitle: 'Potencia tu negocio con inteligencia artificial',
      description: 'Integramos tecnologías de IA en tu aplicación web: chatbots, análisis de datos, automatización de procesos y machine learning.',
      features: [
        'Chatbots inteligentes',
        'Análisis predictivo de datos',
        'Automatización de procesos',
        'Reconocimiento de imágenes',
        'Procesamiento de lenguaje natural',
        'Recomendaciones personalizadas',
        'APIs de IA integradas',
        'Machine Learning personalizado'
      ],
      technologies: ['Angular', 'Python', 'TensorFlow', 'OpenAI API', 'AWS AI Services'],
      category: 'advanced',
      price: 'Cotizar',
      duration: '4-8 semanas',
      includesHosting: true,
      includesSupport: true
    },
  ];

  get filteredServices() {
    if (this.selectedCategory === 'all') {
      return this.services;
    }
    return this.services.filter(service => service.category === this.selectedCategory);
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }

  getSelectedCategoryInfo() {
    return this.categories.find(cat => cat.id === this.selectedCategory);
  }

  trackByServiceId(index: number, service: ServiceDetail): string {
    return service.id;
  }
}
