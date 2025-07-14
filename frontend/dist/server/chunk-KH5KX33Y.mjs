import './polyfills.server.mjs';
import{a as w}from"./chunk-RM62LEJT.mjs";import{a as I,e as T}from"./chunk-IYKINCT5.mjs";import{m as D}from"./chunk-CMLD342J.mjs";import{$ as h,Cb as S,Fb as E,Gb as M,Ib as O,Ka as y,La as m,Oa as r,Pa as v,W as f,bb as d,ca as b,db as s,gb as a,hb as i,ib as c,jb as x,kb as C,nb as u,oc as z,pc as _,sc as A,tb as P,ub as t,vb as p,wb as g}from"./chunk-W7AEZ4IQ.mjs";import"./chunk-VVCT4QZE.mjs";var k=(()=>{class n{constructor(e){this.sanitizer=e}transform(e){return e?(e=e.replace(/^### (.*$)/gim,"<h3>$1</h3>"),e=e.replace(/^## (.*$)/gim,"<h2>$1</h2>"),e=e.replace(/^# (.*$)/gim,"<h1>$1</h1>"),e=e.replace(/\*\*(.*?)\*\*/gim,"<b>$1</b>"),e=e.replace(/^> (.*$)/gim,"<blockquote>$1</blockquote>"),e=e.replace(/^\- (.*$)/gim,"<li>$1</li>"),e=e.replace(/(<li>.*<\/li>)/gim,"<ul>$1</ul>"),e=e.replace(/```([\s\S]*?)```/gim,"<pre><code>$1</code></pre>"),e=e.replace(/!\[(.*?)\]\((.*?)\)/gim,'<img alt="$1" src="$2" style="max-width:100%;border-radius:8px;margin:16px 0;">'),e=e.replace(/\n/g,"<br>"),this.sanitizer.bypassSecurityTrustHtml(e)):""}static{this.\u0275fac=function(o){return new(o||n)(v(D,16))}}static{this.\u0275pipe=b({name:"simpleMarkdown",type:n,pure:!0,standalone:!0})}}return n})();function R(n,l){if(n&1&&(a(0,"span",29),t(1),i()),n&2){let e=l.$implicit;r(),p(e)}}function F(n,l){if(n&1&&(a(0,"li"),t(1,"Aprende m\xE1s sobre "),a(2,"span",32),t(3),i()()),n&2){let e=l.$implicit;r(3),p(e)}}function L(n,l){if(n&1&&(a(0,"div",30)(1,"h3"),t(2,"\xBFPor qu\xE9 es importante este tema?"),i(),a(3,"ul"),d(4,F,4,1,"li",31),i()()),n&2){let e=u(2);r(4),s("ngForOf",e.post.tags)}}function $(n,l){if(n&1&&(x(0),a(1,"section",2)(2,"div",3)(3,"div",4)(4,"a",5),c(5,"app-icon",6),t(6," Volver al Blog "),i(),a(7,"h1",7),t(8),i(),a(9,"div",8),c(10,"img",9),a(11,"span",10),t(12),i(),a(13,"span",11),c(14,"app-icon",12),t(15),i(),a(16,"span",13),c(17,"app-icon",14),t(18),i()(),a(19,"div",15),d(20,R,2,1,"span",16),i()()()(),a(21,"section",17)(22,"div",3),c(23,"img",18),a(24,"div",19)(25,"div",20)(26,"p",21)(27,"strong"),t(28,"\xA1Bienvenido a un nuevo art\xEDculo de Gargurevich.Dev!"),i(),t(29," Aqu\xED aprender\xE1s de forma entretenida y pr\xE1ctica sobre "),a(30,"span",22),t(31),i(),t(32,". Prep\xE1rate para descubrir consejos, ejemplos y claves que te ayudar\xE1n a potenciar tus proyectos digitales. "),i()(),a(33,"div",23),c(34,"div",24),E(35,"simpleMarkdown"),i(),d(36,L,5,1,"div",25),a(37,"div",26)(38,"p"),t(39,"\xBFTe gust\xF3 este art\xEDculo? "),a(40,"a",27),t(41,"Descubre m\xE1s en nuestro blog"),i(),t(42," o "),a(43,"a",28),t(44,"cont\xE1ctanos"),i(),t(45," para llevar tu proyecto al siguiente nivel."),i()()()()(),C()),n&2){let e=u();r(8),p(e.post.title),r(2),s("src",e.post.authorImage,m)("alt",e.post.author),r(2),p(e.post.author),r(3),g(" ",e.formatDate(e.post.publishDate)," "),r(3),g(" ",e.post.readTime," min lectura "),r(2),s("ngForOf",e.post.tags),r(3),s("src",e.post.image,m)("alt",e.post.title),r(8),p(e.post.title),r(3),s("innerHTML",M(35,12,e.post.content),y),r(2),s("ngIf",e.post.tags==null?null:e.post.tags.length)}}function B(n,l){n&1&&(a(0,"section",33)(1,"div",34)(2,"h2"),t(3,"Art\xEDculo no encontrado"),i(),a(4,"p"),t(5,"El art\xEDculo que buscas no existe o ha sido eliminado."),i(),a(6,"a",35),t(7,"Volver al Blog"),i()()())}var Q=(()=>{class n{constructor(){this.route=f(I),this.blogPosts=[{id:"angular-17-nuevas-caracteristicas",title:"Angular 17: Las Nuevas Caracter\xEDsticas que Todo Developer Debe Conocer",excerpt:"Descubre las \xFAltimas funcionalidades de Angular 17 y c\xF3mo pueden mejorar significativamente tu flujo de desarrollo y el rendimiento de tus aplicaciones.",content:`
Angular 17 ha llegado con caracter\xEDsticas revolucionarias que marcan un antes y un despu\xE9s en el desarrollo frontend. Entre las novedades m\xE1s destacadas se encuentran:

- **Nuevo sistema de signals** para una gesti\xF3n reactiva m\xE1s eficiente.
- **Rendering concurrente** que mejora el rendimiento y la experiencia de usuario.
- **CLI m\xE1s intuitiva** y comandos simplificados.
- **Mejoras en SSR** y soporte para Angular Universal.

---

### Ejemplo de c\xF3digo: Uso de Signals

\`\`\`typescript
import { signal, computed } from '@angular/core';

const counter = signal(0);
const double = computed(() => counter() * 2);

counter.set(5);
console.log(double()); // 10
\`\`\`

---

### Imagen destacada

![Angular 17](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop)

---

### Tips r\xE1pidos
- Aprovecha los signals para reducir el boilerplate en tus componentes.
- Utiliza el rendering concurrente para apps con muchas actualizaciones de UI.
- Explora la nueva CLI para generar c\xF3digo m\xE1s r\xE1pido.

> "Angular 17 es ideal para proyectos empresariales y escalables. \xA1No te pierdas la oportunidad de explorar estas nuevas funcionalidades y llevar tus aplicaciones al siguiente nivel!"
`,author:"Miguel Fernandez",authorImage:"https://ui-avatars.com/api/?name=Miguel+Fernandez&background=14213D&color=fff&size=100",publishDate:"2024-12-15",readTime:8,category:"development",tags:["Angular","TypeScript","Frontend","Desarrollo"],image:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",featured:!0},{id:"optimizacion-seo-angular",title:"SEO en Angular: Gu\xEDa Completa para Optimizar tu SPA",excerpt:"Aprende las mejores pr\xE1cticas para optimizar el SEO de tu aplicaci\xF3n Angular y mejorar su visibilidad en los motores de b\xFAsqueda.",content:`
El SEO en Single Page Applications puede ser un desaf\xEDo, pero Angular 17 facilita la optimizaci\xF3n con Angular Universal y meta tags din\xE1micos. Aqu\xED tienes una gu\xEDa pr\xE1ctica para destacar en Google:

---

### Pasos clave para SEO en Angular
1. **Habilita Angular Universal** para SSR y mejor indexaci\xF3n.
2. **Agrega meta tags din\xE1micos** usando el servicio Meta de Angular.
3. **Implementa datos estructurados** para destacar en Google.
4. **Optimiza la velocidad de carga** con lazy loading y prefetching.

---

### Ejemplo de c\xF3digo: Meta tags din\xE1micos

\`\`\`typescript
import { Meta } from '@angular/platform-browser';

constructor(private meta: Meta) {
  this.meta.updateTag({ name: 'description', content: 'SEO para Angular SPA' });
}
\`\`\`

---

### Imagen extra

![SEO Angular](https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop)

---

### Tips r\xE1pidos
- Usa herramientas como Google Search Console para monitorear tu SEO.
- Implementa rutas amigables y canonical URLs.
- Aprovecha el prerendering para p\xE1ginas est\xE1ticas.

> "Haz que tu app destaque en los resultados de b\xFAsqueda con buenas pr\xE1cticas de SEO en Angular."
`,author:"Sofia Rodriguez",authorImage:"https://ui-avatars.com/api/?name=Sofia+Rodriguez&background=14213D&color=fff&size=100",publishDate:"2024-12-10",readTime:12,category:"development",tags:["SEO","Angular","SSR","Optimizaci\xF3n"],image:"https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",featured:!0},{id:"principios-ux-conversiones",title:"10 Principios de UX que Aumentar\xE1n las Conversiones de tu Sitio Web",excerpt:"Conoce los principios fundamentales del dise\xF1o UX que pueden transformar visitantes en clientes y mejorar significativamente tus tasas de conversi\xF3n.",content:`
El dise\xF1o centrado en el usuario es clave para el \xE9xito digital. Estos 10 principios de UX te ayudar\xE1n a crear experiencias memorables y aumentar tus conversiones:

1. Claridad en la navegaci\xF3n
2. Jerarqu\xEDa visual
3. Feedback inmediato
4. Accesibilidad (a11y)
5. Consistencia visual
6. Tiempos de carga \xF3ptimos
7. Microinteracciones
8. Copywriting persuasivo
9. Dise\xF1o mobile-first
10. Pruebas de usabilidad

---

### Ejemplo visual: Jerarqu\xEDa visual

![UX Visual](https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=800&h=400&fit=crop)

---

### Tips r\xE1pidos
- Realiza tests de usabilidad con usuarios reales.
- Usa colores y contrastes para guiar la atenci\xF3n.
- Optimiza la experiencia en dispositivos m\xF3viles.

> "Implementa estos fundamentos y observa c\xF3mo tus conversiones se disparan."
`,author:"Sofia Rodriguez",authorImage:"https://ui-avatars.com/api/?name=Sofia+Rodriguez&background=14213D&color=fff&size=100",publishDate:"2024-12-05",readTime:10,category:"design",tags:["UX","Conversiones","Dise\xF1o","CRO"],image:"https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop",featured:!1},{id:"docker-desarrollo-web",title:"Docker para Desarrolladores Web: Simplifica tu Flujo de Trabajo",excerpt:"Descubre c\xF3mo Docker puede revolucionar tu proceso de desarrollo web, desde el entorno local hasta el despliegue en producci\xF3n.",content:`
Docker ha cambiado la forma en que desarrollamos y desplegamos aplicaciones web. Con contenedores, puedes replicar entornos de desarrollo, evitar el cl\xE1sico "en mi m\xE1quina funciona" y automatizar despliegues en la nube.

---

### Ejemplo de c\xF3digo: Dockerfile b\xE1sico

\`\`\`dockerfile
# Usa una imagen oficial de Node.js
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
\`\`\`

---

### Imagen extra

![Docker Dev](https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop)

---

### Tips r\xE1pidos
- Usa Docker Compose para orquestar m\xFAltiples servicios.
- Versiona tus im\xE1genes para despliegues consistentes.
- Automatiza pruebas en contenedores.

> "Optimiza tu flujo de trabajo y lleva tu stack al siguiente nivel con Docker."
`,author:"Carlos Martinez",authorImage:"https://ui-avatars.com/api/?name=Carlos+Martinez&background=14213D&color=fff&size=100",publishDate:"2024-11-28",readTime:15,category:"technology",tags:["Docker","DevOps","Contenedores","Deployment"],image:"https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop",featured:!1},{id:"performance-web-vitals",title:"Core Web Vitals: C\xF3mo Mejorar el Rendimiento de tu Sitio Web",excerpt:"Aprende a optimizar los Core Web Vitals de Google para mejorar la experiencia del usuario y el posicionamiento SEO de tu sitio web.",content:`
Los Core Web Vitals son m\xE9tricas esenciales para el SEO y la experiencia de usuario. Optimizar LCP, FID y CLS es clave para destacar en Google y ofrecer una web r\xE1pida.

---

### \xBFQu\xE9 son los Core Web Vitals?
- **LCP (Largest Contentful Paint):** Tiempo de carga del contenido principal.
- **FID (First Input Delay):** Tiempo de respuesta a la primera interacci\xF3n.
- **CLS (Cumulative Layout Shift):** Estabilidad visual de la p\xE1gina.

---

### Ejemplo de optimizaci\xF3n: Lazy Loading de im\xE1genes en Angular

\`\`\`html
<img [src]="imagenUrl" loading="lazy" alt="Imagen optimizada">
\`\`\`

---

### Imagen extra

![Web Vitals](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop)

---

### Tips r\xE1pidos
- Usa Lighthouse para auditar tu sitio.
- Optimiza im\xE1genes y recursos est\xE1ticos.
- Minimiza el JavaScript y usa carga diferida.
- Mant\xE9n la estabilidad visual evitando cambios bruscos de layout.

> "Un buen score en Web Vitals mejora tu posicionamiento y la satisfacci\xF3n de tus usuarios."
`,author:"Miguel Fernandez",authorImage:"https://ui-avatars.com/api/?name=Miguel+Fernandez&background=14213D&color=fff&size=100",publishDate:"2024-11-20",readTime:11,category:"tips",tags:["Performance","Web Vitals","SEO","Optimizaci\xF3n"],image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",featured:!1},{id:"typescript-tips-avanzados",title:"TypeScript: 7 Tips Avanzados para Escribir Mejor C\xF3digo",excerpt:"Eleva tu nivel de TypeScript con estos tips avanzados que te ayudar\xE1n a escribir c\xF3digo m\xE1s robusto, mantenible y eficiente.",content:`
TypeScript ofrece caracter\xEDsticas poderosas para escribir c\xF3digo robusto y mantenible. Aqu\xED tienes 7 tips avanzados para llevar tu c\xF3digo al siguiente nivel:

1. **Tipos condicionales** para l\xF3gica de tipos din\xE1mica.
2. **Inferencia avanzada** para menos anotaciones manuales.
3. **Utility types** como Partial, Pick, Omit, Record.
4. **Narrowings** para mayor seguridad en tiempo de ejecuci\xF3n.
5. **Patrones de dise\xF1o con interfaces y tipos**.
6. **Enums y literal types** para mayor expresividad.
7. **Documenta con JSDoc y aprovecha el autocompletado.**

---

### Ejemplo de c\xF3digo: Utility Types

\`\`\`typescript
type User = { id: number; name: string; email: string };
type UserPreview = Pick<User, 'id' | 'name'>;

const user: UserPreview = { id: 1, name: 'Miguel' };
\`\`\`

---

### Imagen extra

![TypeScript Tips](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop)

---

### Tips r\xE1pidos
- Usa el sistema de tipos para detectar errores antes de tiempo.
- Aprovecha los utility types para evitar duplicar c\xF3digo.
- Documenta tus tipos y funciones para mejor DX.

> "TypeScript te ayuda a escribir c\xF3digo m\xE1s seguro, escalable y f\xE1cil de mantener."
`,author:"Carlos Martinez",authorImage:"https://ui-avatars.com/api/?name=Carlos+Martinez&background=14213D&color=fff&size=100",publishDate:"2024-11-15",readTime:9,category:"tutorials",tags:["TypeScript","JavaScript","Tips","Programaci\xF3n"],image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",featured:!1},{id:"e-commerce-tendencias-2025",title:"E-commerce 2025: Tendencias que Transformar\xE1n las Ventas Online",excerpt:"Conoce las principales tendencias del e-commerce para 2025 y c\xF3mo preparar tu tienda online para el futuro del comercio digital.",content:`
El e-commerce contin\xFAa evolucionando r\xE1pidamente y 2025 traer\xE1 tendencias como la personalizaci\xF3n con IA, pagos sin fricci\xF3n, experiencias omnicanal y realidad aumentada.

---

### Tendencias clave para 2025
- **Personalizaci\xF3n con IA**: recomendaciones inteligentes y experiencias \xFAnicas.
- **Pagos sin fricci\xF3n**: wallets, biometr\xEDa y one-click checkout.
- **Omnicanalidad**: integraci\xF3n total entre tienda f\xEDsica y online.
- **Realidad aumentada**: prueba de productos virtualmente.

---

### Ejemplo visual: Realidad aumentada en e-commerce

![E-commerce AR](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop)

---

### Tips r\xE1pidos
- Invierte en experiencia m\xF3vil y velocidad de carga.
- Implementa chatbots y asistentes virtuales.
- Analiza el comportamiento de tus usuarios para personalizar ofertas.

> "Prepara tu tienda online para el futuro y destaca en el competitivo mundo digital."
`,author:"Sofia Rodriguez",authorImage:"https://ui-avatars.com/api/?name=Sofia+Rodriguez&background=14213D&color=fff&size=100",publishDate:"2024-11-08",readTime:13,category:"business",tags:["E-commerce","Tendencias","Ventas","Digital"],image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",featured:!1},{id:"api-rest-nodejs-buenas-practicas",title:"APIs REST con Node.js: Gu\xEDa de Buenas Pr\xE1cticas",excerpt:"Aprende a dise\xF1ar y desarrollar APIs REST robustas y escalables con Node.js siguiendo las mejores pr\xE1cticas de la industria.",content:`
Crear APIs REST efectivas requiere seguir buenas pr\xE1cticas para garantizar escalabilidad, seguridad y mantenibilidad.

---

### Buenas pr\xE1cticas clave
- **Versiona tu API** (v1, v2, etc.)
- **Documenta con Swagger/OpenAPI**
- **Manejo de errores consistente**
- **Autenticaci\xF3n y autorizaci\xF3n seguras**
- **Pruebas automatizadas**
- **Endpoints claros y recursos bien definidos**

---

### Ejemplo de c\xF3digo: Endpoint b\xE1sico con Express

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api/v1/usuarios', (req, res) => {
  res.json([{ id: 1, nombre: 'Miguel' }]);
});

app.listen(3000, () => console.log('API lista'));
\`\`\`

---

### Imagen extra

![Node.js API](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop)

---

### Tips r\xE1pidos
- Usa middlewares para validaci\xF3n y logging.
- Mant\xE9n la l\xF3gica de negocio separada de las rutas.
- Prueba tu API con Postman o Insomnia.

> "Una API bien dise\xF1ada es la base de cualquier arquitectura moderna y escalable."
`,author:"Carlos Martinez",authorImage:"https://ui-avatars.com/api/?name=Carlos+Martinez&background=14213D&color=fff&size=100",publishDate:"2024-11-01",readTime:16,category:"tutorials",tags:["Node.js","API","REST","Backend"],image:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",featured:!1}]}ngOnInit(){let e=this.route.snapshot.paramMap.get("id");this.post=this.blogPosts.find(o=>o.id===e)}formatDate(e){return new Date(e).toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric"})}static{this.\u0275fac=function(o){return new(o||n)}}static{this.\u0275cmp=h({type:n,selectors:[["app-blog-article"]],standalone:!0,features:[S],decls:3,vars:2,consts:[["notFound",""],[4,"ngIf","ngIfElse"],[1,"article-header","section"],[1,"container"],[1,"article-header-content"],["routerLink","/blog",1,"back-link"],["name","arrow-left","size","18px"],[1,"article-title"],[1,"article-meta"],[1,"author-avatar",3,"src","alt"],[1,"author-name"],[1,"publish-date"],["name","calendar","size","14px"],[1,"read-time"],["name","clock","size","14px"],[1,"article-tags"],["class","tag",4,"ngFor","ngForOf"],[1,"article-content","section"],[1,"article-image",3,"src","alt"],[1,"article-body"],[1,"article-intro"],[1,"intro-text"],[1,"highlight"],[1,"article-main-content"],[3,"innerHTML"],["class","article-tips",4,"ngIf"],[1,"article-cta",2,"margin-top","2.5rem"],["routerLink","/blog"],["routerLink","/contact"],[1,"tag"],[1,"article-tips"],[4,"ngFor","ngForOf"],[1,"tip-tag"],[1,"section"],[1,"container","text-center"],["routerLink","/blog",1,"btn","btn-primary"]],template:function(o,j){if(o&1&&d(0,$,46,14,"ng-container",1)(1,B,8,0,"ng-template",null,0,O),o&2){let U=P(2);s("ngIf",j.post)("ngIfElse",U)}},dependencies:[A,z,_,T,w,k],styles:[".article-header[_ngcontent-%COMP%]{background:linear-gradient(90deg,#14213d 60%,#fca311);color:#fff;padding:3rem 0 2rem}.article-header[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]{color:#fca311;font-weight:500;display:inline-flex;align-items:center;gap:.5rem;margin-bottom:1.5rem;text-decoration:none;transition:color .2s}.article-header[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%]:hover{color:#fff}.article-header[_ngcontent-%COMP%]   .article-title[_ngcontent-%COMP%]{font-size:2.4rem;font-weight:700;margin-bottom:1rem;color:#fff}.article-header[_ngcontent-%COMP%]   .article-meta[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:1.2rem;font-size:1rem;margin-bottom:1rem}.article-header[_ngcontent-%COMP%]   .article-meta[_ngcontent-%COMP%]   .author-avatar[_ngcontent-%COMP%]{width:36px;height:36px;border-radius:50%;object-fit:cover;margin-right:.5rem;border:2px solid #FCA311}.article-header[_ngcontent-%COMP%]   .article-meta[_ngcontent-%COMP%]   .author-name[_ngcontent-%COMP%]{font-weight:500;color:#fca311}.article-header[_ngcontent-%COMP%]   .article-meta[_ngcontent-%COMP%]   .publish-date[_ngcontent-%COMP%], .article-header[_ngcontent-%COMP%]   .article-meta[_ngcontent-%COMP%]   .read-time[_ngcontent-%COMP%]{color:#e5e5e5;display:flex;align-items:center;gap:.3rem}.article-header[_ngcontent-%COMP%]   .article-tags[_ngcontent-%COMP%]{margin-top:.5rem}.article-header[_ngcontent-%COMP%]   .article-tags[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]{background:#fca311;color:#14213d;border-radius:4px;padding:.2rem .7rem;font-size:.95rem;margin-right:.5rem;font-weight:500;display:inline-block}.article-content[_ngcontent-%COMP%]{background:#fff;color:#14213d;padding:2.5rem 0 4rem}.article-content[_ngcontent-%COMP%]   .article-image[_ngcontent-%COMP%]{width:100%;max-width:800px;margin:0 auto 2rem;display:block;border-radius:12px;box-shadow:0 4px 32px #14213d14}.article-content[_ngcontent-%COMP%]   .article-body[_ngcontent-%COMP%]{max-width:800px;margin:0 auto;font-size:1.18rem;line-height:1.8;letter-spacing:.01em}.article-content[_ngcontent-%COMP%]   .article-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:1.5rem}@media (max-width: 700px){.article-header[_ngcontent-%COMP%]{padding:2rem 0 1.2rem}.article-header[_ngcontent-%COMP%]   .article-title[_ngcontent-%COMP%]{font-size:1.5rem}.article-header[_ngcontent-%COMP%]   .article-meta[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start;gap:.5rem}.article-content[_ngcontent-%COMP%]{padding:1.2rem 0 2rem}.article-content[_ngcontent-%COMP%]   .article-body[_ngcontent-%COMP%]{font-size:1rem}}"]})}}return n})();export{Q as BlogArticleComponent};
