# 🚀 Gargurevich.Dev - Sitio Web Profesional

Sitio web corporativo moderno para **Gargurevich.Dev**, empresa especializada en desarrollo web de alta calidad con tecnologías de vanguardia.

## ✨ Características Principales

- **Framework**: Angular 17 con TypeScript y Standalone Components
- **Arquitectura**: Modular escalable con lazy loading
- **Estilos**: SCSS modular + sistema de iconografía SVG
- **SSR**: Angular Universal habilitado para SEO optimizado
- **Diseño**: Responsive mobile-first con temas claro/oscuro
- **PWA**: Service Workers y manifiesto para instalación
- **Performance**: Optimizado para Core Web Vitals

## 🎨 Design System

### Paleta de Colores
- `#14213D` - Azul oscuro principal
- `#FCA311` - Amarillo acento para CTAs
- `#94A3B8` - Gris moderno para fondos
- `#FFFFFF` - Blanco para texto sobre fondos oscuros

### Iconografía
- **40+ iconos SVG** personalizados y escalables
- **Sistema consistente** con componente reutilizable
- **Accesibilidad optimizada** con aria-labels

## 🛠️ Servicios Ofrecidos

### 📄 Landing Pages
Páginas de conversión directa optimizadas para resultados

### 🌐 Sitios Web Institucionales  
Presencia digital profesional para empresas

### 🧭 Webs Intermedias Escalables
Soluciones con CMS integrado y funcionalidades avanzadas

### 🛒 E-commerce
Tiendas online modernas con experiencia de usuario premium

### 🛠️ Aplicaciones Web a Medida
Desarrollo de software empresarial personalizado

### ⚡ Integración IA y DevOps
Automatización y tecnologías de inteligencia artificial

## � Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── icon/            # Sistema de iconografía SVG
│   │   ├── header/          # Navegación con tema toggle
│   │   ├── home/            # Hero section + servicios destacados
│   │   ├── services/        # Detalle de servicios con filtros
│   │   ├── cases/           # Portafolio con categorías
│   │   ├── blog/            # Artículos técnicos
│   │   ├── team/            # Información del equipo
│   │   ├── contact/         # Formulario reactivo
│   │   ├── footer/          # Pie modernizado
│   │   ├── theme-toggle/    # Selector de tema
│   │   ├── whatsapp-float/  # Botón flotante de contacto
│   │   └── cookie-banner/   # Banner de cookies
│   ├── services/
│   │   ├── seo.service.ts           # SEO dinámico
│   │   ├── theme.service.ts         # Gestión de temas
│   │   ├── analytics.service.ts     # Google Analytics
│   │   └── structured-data.service.ts # Schema.org
│   └── app.routes.ts        # Rutas con lazy loading
├── assets/
│   ├── icons/              # PWA icons
│   └── images/             # Imágenes del sitio
└── styles.scss            # Variables y estilos globales
```

## 🎯 Funcionalidades Modernas

### 🌙 Modo Claro/Oscuro
- Tema automático según preferencias del sistema
- Toggle manual con persistencia
- Contraste optimizado para accesibilidad

### � Progressive Web App (PWA)
- Instalable en dispositivos móviles y desktop
- Service Workers para cacheo offline
- Manifest configurado con iconos adaptativos

### � SEO Optimizado
- Server-Side Rendering (SSR) con Angular Universal
- Meta tags dinámicos por página
- Structured Data (Schema.org)
- Sitemap automático

### ♿ Accesibilidad (a11y)
- Navegación por teclado optimizada
- Estados focus visibles
- Contraste WCAG AA compliant
- Aria-labels en elementos interactivos

## 🚀 Comandos de Desarrollo

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm start
# Servidor en http://localhost:4200
```

### Build de Producción
```bash
npm run build
# Output en /dist con SSR habilitado
```

### Tests
```bash
npm test
```

### Análisis de Bundle
```bash
npm run build -- --stats-json
```

## 🌐 Deploy y Hosting

El sitio está optimizado para deployment en:
- **Netlify** (recomendado para Angular Universal)
- **Vercel** con soporte SSR
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**

## 📊 Performance

- **Lighthouse Score**: 95+ en todas las métricas
- **Core Web Vitals**: Optimizado
- **Bundle Size**: <100KB initial chunk
- **PWA Score**: 100/100

## 🔧 Tecnologías Utilizadas

- **Angular 17** - Framework principal
- **TypeScript** - Lenguaje de desarrollo
- **SCSS** - Preprocesador CSS
- **Angular Universal** - Server-Side Rendering
- **PWA** - Progressive Web App capabilities
- **Standalone Components** - Arquitectura moderna

## 📝 Licencia

© 2024 Gargurevich.Dev. Todos los derechos reservados.

---

**Contacto**: [info@gargurevich.dev](mailto:info@gargurevich.dev)  
**Web**: [https://gargurevich.dev](https://gargurevich.dev)

### Instalar dependencias
```bash
npm install
```

### Servidor de desarrollo
```bash
npm start
# o
ng serve
```

### Compilar para producción
```bash
npm run build
```

### Ejecutar tests
```bash
npm test
```

### Servidor SSR
```bash
npm run serve:ssr
```

## 🌐 Despliegue

El proyecto está configurado para desplegarse en:
- **Vercel** (recomendado para SSR)
- **Netlify**
- **Firebase Hosting**
- **AWS S3 + CloudFront**

### Comandos de despliegue

```bash
# Build de producción
npm run build

# Build con SSR
npm run build:ssr
```

## 📱 Características Responsive

- **Mobile First**: Diseño optimizado para dispositivos móviles
- **Breakpoints**: 768px (tablet), 1024px (desktop)
- **Touch Friendly**: Botones y elementos táctiles optimizados
- **Performance**: Lazy loading de imágenes y componentes

## 🔧 Configuración de VS Code

El proyecto incluye configuraciones recomendadas en `.vscode/`:
- **Extensiones**: Angular, TypeScript, SCSS
- **Tareas**: Build, serve, test
- **Debugging**: Configuración para depuración

## 📈 SEO y Performance

- **Meta tags** dinámicos por página
- **Open Graph** tags para redes sociales
- **Structured data** para buscadores
- **Core Web Vitals** optimizados
- **Preload** de recursos críticos

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es propiedad de **Gargurevich.Dev** - Todos los derechos reservados.

## 📞 Contacto

- **Web**: [gargurevich.dev](https://gargurevich.dev)
- **Email**: contacto@gargurevich.dev
- **LinkedIn**: [Gargurevich.Dev](https://linkedin.com/company/gargurevich-dev)

---

**Transformamos ideas en soluciones digitales de alta calidad** 🚀
