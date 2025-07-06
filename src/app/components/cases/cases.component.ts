import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

interface PortfolioCase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  url?: string;
  github?: string;
  features: string[];
  completion: string;
  client: string;
  industry: string;
}

interface CaseCategory {
  id: string;
  name: string;
  count: number;
}

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.scss'
})
export class CasesComponent {
  selectedCategory = 'all';
  
  categories: CaseCategory[] = [
    { id: 'all', name: 'Todos los Proyectos', count: 0 },
    { id: 'landing', name: 'Landing Pages', count: 0 },
    { id: 'institutional', name: 'Sitios Institucionales', count: 0 },
    { id: 'ecommerce', name: 'E-commerce', count: 0 },
    { id: 'webapp', name: 'Aplicaciones Web', count: 0 },
    { id: 'advanced', name: 'Proyectos Avanzados', count: 0 }
  ];

  cases: PortfolioCase[] = [
    {
      id: 'techstartup-landing',
      title: 'TechStartup Pro',
      subtitle: 'Landing Page de Alta Conversión',
      description: 'Landing page para startup tecnológica con foco en la captación de leads calificados. Incluye formularios optimizados, testimonios dinámicos y analytics avanzados.',
      category: 'landing',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Google Analytics', 'Mailchimp API'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
      url: 'https://techstartup-demo.gargurevich.dev',
      features: [
        'Diseño responsive mobile-first',
        'Optimización para conversiones (CRO)',
        'Integración con Google Analytics y GTM',
        'Formularios con validación en tiempo real',
        'Sección de testimonios dinámica',
        'Chat bot básico integrado',
        'Optimización SEO completa'
      ],
      completion: '2024',
      client: 'TechStartup Inc.',
      industry: 'Tecnología'
    },
    {
      id: 'restaurant-delivery',
      title: 'Sabores Express',
      subtitle: 'Plataforma de Delivery Gastronómico',
      description: 'Aplicación web completa para restaurant con sistema de pedidos online, gestión de menú, y tracking de entregas en tiempo real.',
      category: 'webapp',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Socket.io', 'Stripe', 'Google Maps API'],
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&crop=center',
      features: [
        'Sistema de pedidos en línea',
        'Gestión dinámica de menú',
        'Carrito de compras avanzado',
        'Tracking de pedidos en tiempo real',
        'Dashboard administrativo',
        'Integración con Stripe para pagos',
        'Notificaciones push',
        'Sistema de calificaciones'
      ],
      completion: '2024',
      client: 'Sabores Express S.A.',
      industry: 'Gastronomía'
    },
    {
      id: 'fashion-ecommerce',
      title: 'Moda Urbana',
      subtitle: 'Tienda Online de Moda',
      description: 'E-commerce moderno para marca de ropa con catálogo interactivo, filtros avanzados, wishlist y sistema de recomendaciones personalizadas.',
      category: 'ecommerce',
      technologies: ['Angular', 'WooCommerce', 'MySQL', 'Redis', 'PayPal', 'Instagram API'],
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center',
      url: 'https://moda-urbana-demo.gargurevich.dev',
      features: [
        'Catálogo con filtros avanzados',
        'Galería de imágenes interactiva',
        'Sistema de tallas y colores',
        'Wishlist y comparador',
        'Recomendaciones personalizadas',
        'Integración con redes sociales',
        'Sistema de descuentos y cupones',
        'Reseñas y calificaciones'
      ],
      completion: '2023',
      client: 'Moda Urbana LTDA',
      industry: 'Moda y Retail'
    },
    {
      id: 'consultora-corporate',
      title: 'Consultora Estratégica',
      subtitle: 'Sitio Web Corporativo',
      description: 'Sitio web institucional para consultora empresarial con blog integrado, sistema de citas online y área de clientes privada.',
      category: 'institutional',
      technologies: ['Angular', 'Strapi CMS', 'PostgreSQL', 'JWT', 'Calendly API'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center',
      url: 'https://consultora-demo.gargurevich.dev',
      features: [
        'Diseño corporativo profesional',
        'Blog con gestión de contenido',
        'Sistema de reserva de citas',
        'Área de clientes privada',
        'Formularios de contacto múltiples',
        'Galería de casos de éxito',
        'Newsletter automático',
        'SEO optimizado'
      ],
      completion: '2023',
      client: 'Estrategia & Consultoría S.A.',
      industry: 'Consultoría'
    },
    {
      id: 'fitness-app',
      title: 'FitTracker Pro',
      subtitle: 'Aplicación de Fitness y Nutrición',
      description: 'Plataforma web para seguimiento de ejercicios y nutrición con planes personalizados, métricas de progreso y comunidad de usuarios.',
      category: 'webapp',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Chart.js', 'Web Push API'],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
      features: [
        'Dashboard de métricas personales',
        'Biblioteca de ejercicios',
        'Planes de entrenamiento personalizados',
        'Calculadora nutricional',
        'Seguimiento de progreso con gráficos',
        'Comunidad y retos',
        'Notificaciones de recordatorios',
        'Integración con wearables'
      ],
      completion: '2024',
      client: 'FitLife Technologies',
      industry: 'Salud y Fitness'
    },
    {
      id: 'real-estate-platform',
      title: 'PropiedadMax',
      subtitle: 'Portal Inmobiliario Avanzado',
      description: 'Plataforma inmobiliaria con búsqueda avanzada, tours virtuales, calculadora de créditos y gestión de agentes.',
      category: 'advanced',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'ElasticSearch', 'Three.js', 'Maps API'],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center',
      url: 'https://propiedadmax-demo.gargurevich.dev',
      features: [
        'Búsqueda geolocalizada avanzada',
        'Tours virtuales 360°',
        'Calculadora de créditos hipotecarios',
        'Sistema de citas con agentes',
        'Comparador de propiedades',
        'Alertas automáticas',
        'Dashboard para agentes',
        'Análisis de mercado'
      ],
      completion: '2024',
      client: 'Inmobiliaria Nacional',
      industry: 'Inmobiliario'
    },
    {
      id: 'agency-landing',
      title: 'Creative Agency',
      subtitle: 'Landing Page Creativa',
      description: 'Landing page para agencia creativa con animaciones CSS avanzadas, portafolio interactivo y formulario de contacto dinámico.',
      category: 'landing',
      technologies: ['Angular', 'GSAP', 'Three.js', 'SCSS', 'EmailJS'],
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop&crop=center',
      url: 'https://creative-agency-demo.gargurevich.dev',
      features: [
        'Animaciones CSS y JavaScript avanzadas',
        'Portafolio interactivo',
        'Efectos de parallax',
        'Formulario de contacto animado',
        'Galería de trabajos filtrable',
        'Testimonios con slider',
        'Optimización para performance',
        'Diseño mobile-first'
      ],
      completion: '2023',
      client: 'Creative Studio',
      industry: 'Diseño y Publicidad'
    },
    {
      id: 'logistics-dashboard',
      title: 'LogiTrack System',
      subtitle: 'Dashboard de Logística',
      description: 'Sistema de gestión logística con tracking en tiempo real, analytics predictivos y optimización de rutas automatizada.',
      category: 'advanced',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Socket.io', 'Maps API', 'ML algorithms'],
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop&crop=center',
      features: [
        'Tracking de vehículos en tiempo real',
        'Optimización automática de rutas',
        'Analytics predictivos',
        'Dashboard con métricas KPI',
        'Alertas y notificaciones',
        'Gestión de inventario',
        'Reportes automatizados',
        'API para integración externa'
      ],
      completion: '2024',
      client: 'TransLogistica S.A.',
      industry: 'Logística y Transporte'
    }
  ];

  constructor() {
    this.updateCategoryCounts();
  }

  get filteredCases() {
    if (this.selectedCategory === 'all') {
      return this.cases;
    }
    return this.cases.filter(case_ => case_.category === this.selectedCategory);
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }

  trackByCaseId(index: number, case_: PortfolioCase): string {
    return case_.id;
  }

  private updateCategoryCounts() {
    this.categories.forEach(category => {
      if (category.id === 'all') {
        category.count = this.cases.length;
      } else {
        category.count = this.cases.filter(case_ => case_.category === category.id).length;
      }
    });
  }
}
