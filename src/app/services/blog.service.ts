import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BlogPost, BlogCategory, BlogPagination, BlogFilters } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly POSTS_PER_PAGE = 6;
  
  // Datos de ejemplo - en producción esto vendría de una API o CMS
  private readonly mockPosts: BlogPost[] = [
    {
      id: '1',
      slug: 'angular-17-guia-completa',
      title: 'Angular 17: Guía Completa de las Nuevas Funcionalidades',
      excerpt: 'Descubre todas las nuevas características de Angular 17, incluyendo control flow, SSR mejorado y standalone components.',
      content: this.getMockContent('angular-17'),
      author: {
        name: 'Miguel Gargurevich',
        avatar: '/assets/icons/icon-128x128.png',
        bio: 'Senior Frontend Developer especializado en Angular y React'
      },
      publishedAt: '2025-01-15',
      featured: true,
      tags: ['Angular', 'Frontend', 'TypeScript', 'SSR'],
      category: 'Framework',
      readingTime: 8,
      image: {
        url: '/assets/icons/icon-384x384.png',
        alt: 'Imagen de ejemplo'
      },
      seo: {
        metaTitle: 'Angular 17: Guía Completa - Nuevas Funcionalidades 2025',
        metaDescription: 'Aprende todo sobre Angular 17: control flow, SSR, standalone components y más. Guía completa con ejemplos prácticos.',
        keywords: ['Angular 17', 'Frontend', 'TypeScript', 'SSR', 'Control Flow']
      }
    },
    {
      id: '2',
      slug: 'performance-web-core-vitals',
      title: 'Optimización de Performance Web: Core Web Vitals',
      excerpt: 'Aprende a optimizar los Core Web Vitals para mejorar el SEO y la experiencia del usuario en tu aplicación web.',
      content: this.getMockContent('performance'),
      author: {
        name: 'Miguel Gargurevich',
        avatar: '/assets/icons/icon-128x128.png',
        bio: 'Senior Frontend Developer especializado en Angular y React'
      },
      publishedAt: '2025-01-10',
      featured: true,
      tags: ['Performance', 'SEO', 'Core Web Vitals', 'UX'],
      category: 'Performance',
      readingTime: 6,
      image: {
        url: '/assets/icons/icon-384x384.png',
        alt: 'Imagen de ejemplo'
      },
      seo: {
        metaTitle: 'Core Web Vitals: Guía de Optimización de Performance 2025',
        metaDescription: 'Optimiza Core Web Vitals: LCP, CLS, FID. Mejora SEO y UX con técnicas avanzadas de performance web.',
        keywords: ['Core Web Vitals', 'Performance', 'SEO', 'LCP', 'CLS', 'FID']
      }
    },
    {
      id: '3',
      slug: 'typescript-tips-avanzados',
      title: '10 Tips Avanzados de TypeScript para Desarrolladores',
      excerpt: 'Descubre técnicas avanzadas de TypeScript que mejorarán tu productividad y la calidad de tu código.',
      content: this.getMockContent('typescript'),
      author: {
        name: 'Miguel Gargurevich',
        avatar: '/assets/icons/icon-128x128.png',
        bio: 'Senior Frontend Developer especializado en Angular y React'
      },
      publishedAt: '2025-01-05',
      featured: false,
      tags: ['TypeScript', 'Tips', 'Desarrollo', 'JavaScript'],
      category: 'Desarrollo',
      readingTime: 5,
      image: {
        url: '/assets/icons/icon-384x384.png',
        alt: 'Imagen de ejemplo'
      },
      seo: {
        metaTitle: '10 Tips Avanzados de TypeScript - Mejora tu Código 2025',
        metaDescription: 'Domina TypeScript con estos 10 tips avanzados. Utility types, conditional types, y más técnicas profesionales.',
        keywords: ['TypeScript', 'Tips', 'JavaScript', 'Desarrollo', 'Programming']
      }
    },
    {
      id: '4',
      slug: 'css-grid-flexbox-guia',
      title: 'CSS Grid vs Flexbox: Cuándo Usar Cada Uno',
      excerpt: 'Guía completa sobre cuándo usar CSS Grid y cuándo usar Flexbox para crear layouts modernos y responsivos.',
      content: this.getMockContent('css-layout'),
      author: {
        name: 'Miguel Gargurevich',
        avatar: '/assets/icons/icon-128x128.png',
        bio: 'Senior Frontend Developer especializado en Angular y React'
      },
      publishedAt: '2024-12-28',
      featured: false,
      tags: ['CSS', 'Grid', 'Flexbox', 'Layout', 'Responsive'],
      category: 'CSS',
      readingTime: 7,
      image: {
        url: '/assets/icons/icon-384x384.png',
        alt: 'Imagen de ejemplo'
      },
      seo: {
        metaTitle: 'CSS Grid vs Flexbox: Guía Completa 2025 - Cuándo Usar Cada Uno',
        metaDescription: 'Aprende las diferencias entre CSS Grid y Flexbox. Guía práctica con ejemplos para crear layouts modernos.',
        keywords: ['CSS Grid', 'Flexbox', 'Layout', 'CSS', 'Responsive Design']
      }
    },
    {
      id: '5',
      slug: 'react-vs-angular-comparacion',
      title: 'React vs Angular en 2025: Comparación Detallada',
      excerpt: 'Análisis completo de React y Angular: rendimiento, ecosistema, curva de aprendizaje y casos de uso.',
      content: this.getMockContent('react-angular'),
      author: {
        name: 'Miguel Gargurevich',
        avatar: '/assets/icons/icon-128x128.png',
        bio: 'Senior Frontend Developer especializado en Angular y React'
      },
      publishedAt: '2024-12-20',
      featured: true,
      tags: ['React', 'Angular', 'Framework', 'Comparación'],
      category: 'Framework',
      readingTime: 10,
      image: {
        url: '/assets/icons/icon-384x384.png',
        alt: 'Imagen de ejemplo'
      },
      seo: {
        metaTitle: 'React vs Angular 2025: Comparación Completa - ¿Cuál Elegir?',
        metaDescription: 'Comparación detallada React vs Angular 2025: performance, ecosistema, facilidad de uso. Decide qué framework usar.',
        keywords: ['React vs Angular', 'Framework Comparison', 'Frontend', 'JavaScript']
      }
    },
    {
      id: '6',
      slug: 'javascript-es2024-nuevas-features',
      title: 'JavaScript ES2024: Nuevas Características que Debes Conocer',
      excerpt: 'Explora las nuevas características de JavaScript ES2024 que revolucionarán tu forma de programar.',
      content: this.getMockContent('javascript-es2024'),
      author: {
        name: 'Miguel Gargurevich',
        avatar: '/assets/icons/icon-128x128.png',
        bio: 'Senior Frontend Developer especializado en Angular y React'
      },
      publishedAt: '2024-12-15',
      featured: false,
      tags: ['JavaScript', 'ES2024', 'ECMAScript', 'Nuevas Features'],
      category: 'JavaScript',
      readingTime: 6,
      image: {
        url: '/assets/icons/icon-384x384.png',
        alt: 'Imagen de ejemplo'
      },
      seo: {
        metaTitle: 'JavaScript ES2024: Nuevas Características y Features 2025',
        metaDescription: 'Descubre las nuevas características de JavaScript ES2024. Syntax moderno, nuevos métodos y funcionalidades.',
        keywords: ['JavaScript ES2024', 'ECMAScript', 'JavaScript Features', 'Modern JavaScript']
      }
    }
  ];

  private readonly mockCategories: BlogCategory[] = [
    { id: '1', name: 'Framework', slug: 'framework', description: 'Angular, React, Vue y otros frameworks', color: '#3B82F6' },
    { id: '2', name: 'Performance', slug: 'performance', description: 'Optimización y rendimiento web', color: '#10B981' },
    { id: '3', name: 'Desarrollo', slug: 'desarrollo', description: 'Tips y técnicas de desarrollo', color: '#8B5CF6' },
    { id: '4', name: 'CSS', slug: 'css', description: 'Estilos y diseño web moderno', color: '#F59E0B' },
    { id: '5', name: 'JavaScript', slug: 'javascript', description: 'JavaScript vanilla y moderno', color: '#EF4444' }
  ];

  constructor() {}

  // Obtener todos los posts con filtros y paginación
  getPosts(filters: BlogFilters = {}, page: number = 1): Observable<{ posts: BlogPost[], pagination: BlogPagination }> {
    let filteredPosts = [...this.mockPosts];

    // Aplicar filtros
    if (filters.category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    if (filters.tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(tag => tag.toLowerCase() === filters.tag?.toLowerCase())
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.featured !== undefined) {
      filteredPosts = filteredPosts.filter(post => post.featured === filters.featured);
    }

    // Ordenar por fecha (más recientes primero)
    filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    // Paginación
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / this.POSTS_PER_PAGE);
    const startIndex = (page - 1) * this.POSTS_PER_PAGE;
    const endIndex = startIndex + this.POSTS_PER_PAGE;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    const pagination: BlogPagination = {
      currentPage: page,
      totalPages,
      totalPosts,
      postsPerPage: this.POSTS_PER_PAGE,
      hasNext: page < totalPages,
      hasPrevious: page > 1
    };

    return of({ posts: paginatedPosts, pagination });
  }

  // Obtener post por slug
  getPostBySlug(slug: string): Observable<BlogPost | null> {
    const post = this.mockPosts.find(p => p.slug === slug);
    return of(post ?? null);
  }

  // Obtener posts relacionados
  getRelatedPosts(postId: string, limit: number = 3): Observable<BlogPost[]> {
    const currentPost = this.mockPosts.find(p => p.id === postId);
    if (!currentPost) return of([]);

    const relatedPosts = this.mockPosts
      .filter(post => 
        post.id !== postId && 
        (post.category === currentPost.category || 
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .slice(0, limit);

    return of(relatedPosts);
  }

  // Obtener posts destacados
  getFeaturedPosts(limit: number = 3): Observable<BlogPost[]> {
    const featuredPosts = this.mockPosts
      .filter(post => post.featured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);

    return of(featuredPosts);
  }

  // Obtener categorías
  getCategories(): Observable<BlogCategory[]> {
    return of(this.mockCategories);
  }

  // Obtener todas las etiquetas
  getTags(): Observable<string[]> {
    const allTags = this.mockPosts.flatMap(post => post.tags);
    const uniqueTags = [...new Set(allTags)].sort();
    return of(uniqueTags);
  }

  private getMockContent(type: string): string {
    const contents = {
      'angular-17': `
        <h2>Introducción a Angular 17</h2>
        <p>Angular 17 representa un salto significativo en el desarrollo de aplicaciones web modernas. Esta versión introduce cambios revolucionarios que simplifican el desarrollo y mejoran el rendimiento.</p>
        
        <h3>Control Flow Mejorado</h3>
        <p>Una de las características más destacadas es el nuevo sistema de control flow que reemplaza las directivas estructurales tradicionales:</p>
        <pre><code>@if (user.isLoggedIn) {
  <div>Bienvenido, {{user.name}}!</div>
} @else {
  <div>Por favor, inicia sesión</div>
}</code></pre>
        
        <h3>SSR y Hydration</h3>
        <p>Angular 17 mejora significativamente el Server-Side Rendering con hydration no-destructiva, lo que resulta en cargas de página más rápidas y mejor SEO.</p>
        
        <h3>Standalone Components por Defecto</h3>
        <p>Los componentes standalone son ahora la opción por defecto, simplificando la arquitectura de las aplicaciones y reduciendo el boilerplate.</p>
      `,
      'performance': `
        <h2>Core Web Vitals: La Base del Performance</h2>
        <p>Los Core Web Vitals son métricas esenciales que Google utiliza para evaluar la experiencia del usuario en tu sitio web.</p>
        
        <h3>Largest Contentful Paint (LCP)</h3>
        <p>Mide cuándo se renderiza el elemento más grande visible. Objetivo: menos de 2.5 segundos.</p>
        <ul>
          <li>Optimiza imágenes con formatos modernos (WebP, AVIF)</li>
          <li>Implementa lazy loading</li>
          <li>Usa CDN para contenido estático</li>
        </ul>
        
        <h3>Cumulative Layout Shift (CLS)</h3>
        <p>Mide la estabilidad visual. Objetivo: menos de 0.1.</p>
        <ul>
          <li>Define dimensiones para imágenes y videos</li>
          <li>Reserva espacio para contenido dinámico</li>
          <li>Evita insertar contenido encima del existente</li>
        </ul>
      `,
      'typescript': `
        <h2>Tips Avanzados de TypeScript</h2>
        <p>TypeScript ofrece características avanzadas que pueden mejorar significativamente tu productividad como desarrollador.</p>
        
        <h3>1. Utility Types</h3>
        <pre><code>interface User {
  id: string;
  name: string;
  email: string;
}

type UserUpdate = Partial<User>;
type UserCreate = Omit<User, 'id'>;</code></pre>
        
        <h3>2. Conditional Types</h3>
        <pre><code>type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };</code></pre>
        
        <h3>3. Template Literal Types</h3>
        <pre><code>type EventName = 'click' | 'scroll' | 'mousemove';
type EventHandlerName = \`on\${Capitalize<EventName>}\`;</code></pre>
      `,
      'css-layout': `
        <h2>CSS Grid vs Flexbox: Cuándo Usar Cada Uno</h2>
        <p>Ambas tecnologías son poderosas, pero tienen casos de uso específicos donde cada una brilla.</p>
        
        <h3>Cuándo Usar CSS Grid</h3>
        <ul>
          <li>Layouts bidimensionales (filas y columnas)</li>
          <li>Diseños de página completos</li>
          <li>Cuando necesitas control preciso sobre el posicionamiento</li>
        </ul>
        
        <h3>Cuándo Usar Flexbox</h3>
        <ul>
          <li>Layouts unidimensionales (fila o columna)</li>
          <li>Centrar contenido</li>
          <li>Distribuir espacio entre elementos</li>
        </ul>
        
        <h3>Ejemplo Práctico</h3>
        <pre><code>/* Grid para layout de página */
.page-layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
}

/* Flexbox para navegación */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>
      `,
      'react-angular': `
        <h2>React vs Angular: Comparación Detallada 2025</h2>
        <p>Ambos frameworks tienen sus fortalezas y debilidades. La elección depende de varios factores.</p>
        
        <h3>Curva de Aprendizaje</h3>
        <p><strong>React:</strong> Más fácil de empezar, pero requiere conocer el ecosistema.</p>
        <p><strong>Angular:</strong> Curva más empinada, pero más opinado y estructurado.</p>
        
        <h3>Performance</h3>
        <p>Ambos ofrecen excelente rendimiento con las optimizaciones correctas:</p>
        <ul>
          <li>React: Virtual DOM, React.memo, useMemo</li>
          <li>Angular: OnPush strategy, TrackBy functions</li>
        </ul>
        
        <h3>Ecosistema</h3>
        <p><strong>React:</strong> Más flexibilidad, mayor variedad de librerías.</p>
        <p><strong>Angular:</strong> Solución completa, menos decisiones que tomar.</p>
      `,
      'javascript-es2024': `
        <h2>JavaScript ES2024: Nuevas Características</h2>
        <p>ES2024 trae características emocionantes que mejoran la productividad del desarrollador.</p>
        
        <h3>Array Grouping</h3>
        <pre><code>const inventory = [
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' }
];

const grouped = Object.groupBy(inventory, item => item.type);
// { fruit: [...], vegetable: [...] }</code></pre>
        
        <h3>Promise.withResolvers()</h3>
        <pre><code>const { promise, resolve, reject } = Promise.withResolvers();

// Usar resolve/reject desde cualquier lugar
setTimeout(() => resolve('Done!'), 1000);</code></pre>
        
        <h3>Temporal API (Propuesta)</h3>
        <pre><code>const now = Temporal.Now.plainDateTimeISO();
const nextWeek = now.add({ days: 7 });</code></pre>
      `
    };

    return contents[type as keyof typeof contents] || '<p>Contenido del artículo...</p>';
  }
}
