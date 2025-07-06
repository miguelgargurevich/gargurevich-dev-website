
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: number;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

import { SimpleMarkdownPipe } from '../../pipes/simple-markdown.pipe';

@Component({
  selector: 'app-blog-article',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent, SimpleMarkdownPipe],
  templateUrl: './blog-article.component.html',
  styleUrl: './blog-article.component.scss'
})
export class BlogArticleComponent {
  private route = inject(ActivatedRoute);

  blogPosts: BlogPost[] = [
    {
      id: 'angular-17-nuevas-caracteristicas',
      title: 'Angular 17: Las Nuevas Características que Todo Developer Debe Conocer',
      excerpt: 'Descubre las últimas funcionalidades de Angular 17 y cómo pueden mejorar significativamente tu flujo de desarrollo y el rendimiento de tus aplicaciones.',
      content: `\nAngular 17 ha llegado con características revolucionarias que marcan un antes y un después en el desarrollo frontend. Entre las novedades más destacadas se encuentran:\n\n- **Nuevo sistema de signals** para una gestión reactiva más eficiente.\n- **Rendering concurrente** que mejora el rendimiento y la experiencia de usuario.\n- **CLI más intuitiva** y comandos simplificados.\n- **Mejoras en SSR** y soporte para Angular Universal.\n\n---\n\n### Ejemplo de código: Uso de Signals\n\n\`\`\`typescript\nimport { signal, computed } from '@angular/core';\n\nconst counter = signal(0);\nconst double = computed(() => counter() * 2);\n\ncounter.set(5);\nconsole.log(double()); // 10\n\`\`\`\n\n---\n\n### Imagen destacada\n\n![Angular 17](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop)\n\n---\n\n### Tips rápidos\n- Aprovecha los signals para reducir el boilerplate en tus componentes.\n- Utiliza el rendering concurrente para apps con muchas actualizaciones de UI.\n- Explora la nueva CLI para generar código más rápido.\n\n> "Angular 17 es ideal para proyectos empresariales y escalables. ¡No te pierdas la oportunidad de explorar estas nuevas funcionalidades y llevar tus aplicaciones al siguiente nivel!"\n`,
      author: 'Miguel Fernandez',
      authorImage: 'https://ui-avatars.com/api/?name=Miguel+Fernandez&background=14213D&color=fff&size=100',
      publishDate: '2024-12-15',
      readTime: 8,
      category: 'development',
      tags: ['Angular', 'TypeScript', 'Frontend', 'Desarrollo'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      featured: true
    },
    {
      id: 'optimizacion-seo-angular',
      title: 'SEO en Angular: Guía Completa para Optimizar tu SPA',
      excerpt: 'Aprende las mejores prácticas para optimizar el SEO de tu aplicación Angular y mejorar su visibilidad en los motores de búsqueda.',
      content: `\nEl SEO en Single Page Applications puede ser un desafío, pero Angular 17 facilita la optimización con Angular Universal y meta tags dinámicos. Aquí tienes una guía práctica para destacar en Google:\n\n---\n\n### Pasos clave para SEO en Angular\n1. **Habilita Angular Universal** para SSR y mejor indexación.\n2. **Agrega meta tags dinámicos** usando el servicio Meta de Angular.\n3. **Implementa datos estructurados** para destacar en Google.\n4. **Optimiza la velocidad de carga** con lazy loading y prefetching.\n\n---\n\n### Ejemplo de código: Meta tags dinámicos\n\n\`\`\`typescript\nimport { Meta } from '@angular/platform-browser';\n\nconstructor(private meta: Meta) {\n  this.meta.updateTag({ name: 'description', content: 'SEO para Angular SPA' });\n}\n\`\`\`\n\n---\n\n### Imagen extra\n\n![SEO Angular](https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop)\n\n---\n\n### Tips rápidos\n- Usa herramientas como Google Search Console para monitorear tu SEO.\n- Implementa rutas amigables y canonical URLs.\n- Aprovecha el prerendering para páginas estáticas.\n\n> "Haz que tu app destaque en los resultados de búsqueda con buenas prácticas de SEO en Angular."\n`,
      author: 'Sofia Rodriguez',
      authorImage: 'https://ui-avatars.com/api/?name=Sofia+Rodriguez&background=14213D&color=fff&size=100',
      publishDate: '2024-12-10',
      readTime: 12,
      category: 'development',
      tags: ['SEO', 'Angular', 'SSR', 'Optimización'],
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop',
      featured: true
    },
    {
      id: 'principios-ux-conversiones',
      title: '10 Principios de UX que Aumentarán las Conversiones de tu Sitio Web',
      excerpt: 'Conoce los principios fundamentales del diseño UX que pueden transformar visitantes en clientes y mejorar significativamente tus tasas de conversión.',
      content: `\nEl diseño centrado en el usuario es clave para el éxito digital. Estos 10 principios de UX te ayudarán a crear experiencias memorables y aumentar tus conversiones:\n\n1. Claridad en la navegación\n2. Jerarquía visual\n3. Feedback inmediato\n4. Accesibilidad (a11y)\n5. Consistencia visual\n6. Tiempos de carga óptimos\n7. Microinteracciones\n8. Copywriting persuasivo\n9. Diseño mobile-first\n10. Pruebas de usabilidad\n\n---\n\n### Ejemplo visual: Jerarquía visual\n\n![UX Visual](https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=800&h=400&fit=crop)\n\n---\n\n### Tips rápidos\n- Realiza tests de usabilidad con usuarios reales.\n- Usa colores y contrastes para guiar la atención.\n- Optimiza la experiencia en dispositivos móviles.\n\n> "Implementa estos fundamentos y observa cómo tus conversiones se disparan."\n`,
      author: 'Sofia Rodriguez',
      authorImage: 'https://ui-avatars.com/api/?name=Sofia+Rodriguez&background=14213D&color=fff&size=100',
      publishDate: '2024-12-05',
      readTime: 10,
      category: 'design',
      tags: ['UX', 'Conversiones', 'Diseño', 'CRO'],
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 'docker-desarrollo-web',
      title: 'Docker para Desarrolladores Web: Simplifica tu Flujo de Trabajo',
      excerpt: 'Descubre cómo Docker puede revolucionar tu proceso de desarrollo web, desde el entorno local hasta el despliegue en producción.',
      content: `\nDocker ha cambiado la forma en que desarrollamos y desplegamos aplicaciones web. Con contenedores, puedes replicar entornos de desarrollo, evitar el clásico "en mi máquina funciona" y automatizar despliegues en la nube.\n\n---\n\n### Ejemplo de código: Dockerfile básico\n\n\`\`\`dockerfile\n# Usa una imagen oficial de Node.js\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD [\"npm\", \"start\"]\n\`\`\`\n\n---\n\n### Imagen extra\n\n![Docker Dev](https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop)\n\n---\n\n### Tips rápidos\n- Usa Docker Compose para orquestar múltiples servicios.\n- Versiona tus imágenes para despliegues consistentes.\n- Automatiza pruebas en contenedores.\n\n> "Optimiza tu flujo de trabajo y lleva tu stack al siguiente nivel con Docker."\n`,
      author: 'Carlos Martinez',
      authorImage: 'https://ui-avatars.com/api/?name=Carlos+Martinez&background=14213D&color=fff&size=100',
      publishDate: '2024-11-28',
      readTime: 15,
      category: 'technology',
      tags: ['Docker', 'DevOps', 'Contenedores', 'Deployment'],
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 'performance-web-vitals',
      title: 'Core Web Vitals: Cómo Mejorar el Rendimiento de tu Sitio Web',
      excerpt: 'Aprende a optimizar los Core Web Vitals de Google para mejorar la experiencia del usuario y el posicionamiento SEO de tu sitio web.',
      content: `\nLos Core Web Vitals son métricas esenciales para el SEO y la experiencia de usuario. Optimizar LCP, FID y CLS es clave para destacar en Google y ofrecer una web rápida.\n\n---\n\n### ¿Qué son los Core Web Vitals?\n- **LCP (Largest Contentful Paint):** Tiempo de carga del contenido principal.\n- **FID (First Input Delay):** Tiempo de respuesta a la primera interacción.\n- **CLS (Cumulative Layout Shift):** Estabilidad visual de la página.\n\n---\n\n### Ejemplo de optimización: Lazy Loading de imágenes en Angular\n\n\`\`\`html\n<img [src]="imagenUrl" loading="lazy" alt="Imagen optimizada">\n\`\`\`\n\n---\n\n### Imagen extra\n\n![Web Vitals](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop)\n\n---\n\n### Tips rápidos\n- Usa Lighthouse para auditar tu sitio.\n- Optimiza imágenes y recursos estáticos.\n- Minimiza el JavaScript y usa carga diferida.\n- Mantén la estabilidad visual evitando cambios bruscos de layout.\n\n> "Un buen score en Web Vitals mejora tu posicionamiento y la satisfacción de tus usuarios."\n`,
      author: 'Miguel Fernandez',
      authorImage: 'https://ui-avatars.com/api/?name=Miguel+Fernandez&background=14213D&color=fff&size=100',
      publishDate: '2024-11-20',
      readTime: 11,
      category: 'tips',
      tags: ['Performance', 'Web Vitals', 'SEO', 'Optimización'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 'typescript-tips-avanzados',
      title: 'TypeScript: 7 Tips Avanzados para Escribir Mejor Código',
      excerpt: 'Eleva tu nivel de TypeScript con estos tips avanzados que te ayudarán a escribir código más robusto, mantenible y eficiente.',
      content: `\nTypeScript ofrece características poderosas para escribir código robusto y mantenible. Aquí tienes 7 tips avanzados para llevar tu código al siguiente nivel:\n\n1. **Tipos condicionales** para lógica de tipos dinámica.\n2. **Inferencia avanzada** para menos anotaciones manuales.\n3. **Utility types** como Partial, Pick, Omit, Record.\n4. **Narrowings** para mayor seguridad en tiempo de ejecución.\n5. **Patrones de diseño con interfaces y tipos**.\n6. **Enums y literal types** para mayor expresividad.\n7. **Documenta con JSDoc y aprovecha el autocompletado.**\n\n---\n\n### Ejemplo de código: Utility Types\n\n\`\`\`typescript\ntype User = { id: number; name: string; email: string };\ntype UserPreview = Pick<User, 'id' | 'name'>;\n\nconst user: UserPreview = { id: 1, name: 'Miguel' };\n\`\`\`\n\n---\n\n### Imagen extra\n\n![TypeScript Tips](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop)\n\n---\n\n### Tips rápidos\n- Usa el sistema de tipos para detectar errores antes de tiempo.\n- Aprovecha los utility types para evitar duplicar código.\n- Documenta tus tipos y funciones para mejor DX.\n\n> "TypeScript te ayuda a escribir código más seguro, escalable y fácil de mantener."\n`,
      author: 'Carlos Martinez',
      authorImage: 'https://ui-avatars.com/api/?name=Carlos+Martinez&background=14213D&color=fff&size=100',
      publishDate: '2024-11-15',
      readTime: 9,
      category: 'tutorials',
      tags: ['TypeScript', 'JavaScript', 'Tips', 'Programación'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 'e-commerce-tendencias-2025',
      title: 'E-commerce 2025: Tendencias que Transformarán las Ventas Online',
      excerpt: 'Conoce las principales tendencias del e-commerce para 2025 y cómo preparar tu tienda online para el futuro del comercio digital.',
      content: `\nEl e-commerce continúa evolucionando rápidamente y 2025 traerá tendencias como la personalización con IA, pagos sin fricción, experiencias omnicanal y realidad aumentada.\n\n---\n\n### Tendencias clave para 2025\n- **Personalización con IA**: recomendaciones inteligentes y experiencias únicas.\n- **Pagos sin fricción**: wallets, biometría y one-click checkout.\n- **Omnicanalidad**: integración total entre tienda física y online.\n- **Realidad aumentada**: prueba de productos virtualmente.\n\n---\n\n### Ejemplo visual: Realidad aumentada en e-commerce\n\n![E-commerce AR](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop)\n\n---\n\n### Tips rápidos\n- Invierte en experiencia móvil y velocidad de carga.\n- Implementa chatbots y asistentes virtuales.\n- Analiza el comportamiento de tus usuarios para personalizar ofertas.\n\n> "Prepara tu tienda online para el futuro y destaca en el competitivo mundo digital."\n`,
      author: 'Sofia Rodriguez',
      authorImage: 'https://ui-avatars.com/api/?name=Sofia+Rodriguez&background=14213D&color=fff&size=100',
      publishDate: '2024-11-08',
      readTime: 13,
      category: 'business',
      tags: ['E-commerce', 'Tendencias', 'Ventas', 'Digital'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 'api-rest-nodejs-buenas-practicas',
      title: 'APIs REST con Node.js: Guía de Buenas Prácticas',
      excerpt: 'Aprende a diseñar y desarrollar APIs REST robustas y escalables con Node.js siguiendo las mejores prácticas de la industria.',
      content: `\nCrear APIs REST efectivas requiere seguir buenas prácticas para garantizar escalabilidad, seguridad y mantenibilidad.\n\n---\n\n### Buenas prácticas clave\n- **Versiona tu API** (v1, v2, etc.)\n- **Documenta con Swagger/OpenAPI**\n- **Manejo de errores consistente**\n- **Autenticación y autorización seguras**\n- **Pruebas automatizadas**\n- **Endpoints claros y recursos bien definidos**\n\n---\n\n### Ejemplo de código: Endpoint básico con Express\n\n\`\`\`javascript\nconst express = require('express');\nconst app = express();\n\napp.get('/api/v1/usuarios', (req, res) => {\n  res.json([{ id: 1, nombre: 'Miguel' }]);\n});\n\napp.listen(3000, () => console.log('API lista'));\n\`\`\`\n\n---\n\n### Imagen extra\n\n![Node.js API](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop)\n\n---\n\n### Tips rápidos\n- Usa middlewares para validación y logging.\n- Mantén la lógica de negocio separada de las rutas.\n- Prueba tu API con Postman o Insomnia.\n\n> "Una API bien diseñada es la base de cualquier arquitectura moderna y escalable."\n`,
      author: 'Carlos Martinez',
      authorImage: 'https://ui-avatars.com/api/?name=Carlos+Martinez&background=14213D&color=fff&size=100',
      publishDate: '2024-11-01',
      readTime: 16,
      category: 'tutorials',
      tags: ['Node.js', 'API', 'REST', 'Backend'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
      featured: false
    }
  ];

  post: BlogPost | undefined;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.post = this.blogPosts.find(p => p.id === id);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
