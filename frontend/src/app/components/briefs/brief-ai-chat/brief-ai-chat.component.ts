
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icon/icon.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ContextService } from '../../../services/context.service';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

@Component({
  selector: 'app-brief-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconComponent],
  templateUrl: './brief-ai-chat.component.html',
  styleUrls: ['./brief-ai-chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BriefAiChatComponent {
  messages: ChatMessage[] = [
    { sender: 'bot', text: '¡Hola! Soy tu asistente para cotizaciones. ¿En qué puedo ayudarte hoy?' }
  ];
  userInputControl = new FormControl({ value: '', disabled: false });
  step = 0;
  data: any = {};
  sending = false;
  finished = false;
  sendError = false;
  show = false; // Para mostrar/ocultar el chat flotante
  isEmbedded = false; // true si se usa como página/ruta


  constructor(private context: ContextService, private route: ActivatedRoute) {
    // Al iniciar, setea el contexto global a sección brief
    this.context.setContext({ currentSection: 'brief', briefType: undefined });
    // Detectar si está embebido en una ruta (ej: /brief/:type)
    this.route.paramMap.subscribe(params => {
      if (params.has('type')) {
        this.isEmbedded = true;
        this.show = true;
      }
    });
  }

  toggleChat() {
    this.show = !this.show;
    if (this.show) {
      setTimeout(() => {
        const el = document.querySelector('.brief-ai-chat-messages') as HTMLElement;
        if (el) el.scrollTop = el.scrollHeight;
      }, 100);
    }
  }

  async sendMessage() {
    const input = this.userInputControl.value?.trim();
    console.log('[brief-ai-chat] sendMessage() disparado. Valor input:', input);
    if (!input) {
      console.log('[brief-ai-chat] Input vacío, no se envía mensaje.');
      return;
    }
    this.messages.push({ sender: 'user', text: input });
    this.userInputControl.setValue('');
    // Análisis de sentimiento básico
    const sentiment = this.analyzeSentiment(input);
    this.context.setContext({ lastAction: 'user_message', lastMessage: input, sentiment });
    console.log('[brief-ai-chat] Sentimiento detectado:', sentiment);
    await this.handleConversation(input);
    console.log('[brief-ai-chat] handleConversation() ejecutado. Estado data:', this.data);
  }

  analyzeSentiment(text: string): string {
    const positive = /(gracias|excelente|perfecto|me gusta|feliz|genial|bien|content[ao])/i;
    const negative = /(mal|problema|no me gusta|triste|caro|difícil|complicado|frustrad[ao])/i;
    if (positive.test(text)) return 'positivo';
    if (negative.test(text)) return 'negativo';
    return 'neutral';
  }

  async handleConversation(input: string) {
    // 1. Descubrir necesidad
    if (!this.data.projectType) {
      // Detectar si el usuario ya menciona un tipo de proyecto (palabra completa)
      const tipos = [
        { key: 'landing', label: 'landing page' },
        { key: 'web', label: 'sitio web' },
        { key: 'ecommerce', label: 'e-commerce' },
        { key: 'ia', label: 'integración IA' },
        { key: 'app', label: 'aplicación' },
        { key: 'tienda', label: 'tienda online' },
        { key: 'institucional', label: 'web institucional' }
      ];
      const lower = ` ${input.toLowerCase()} `;
      let match = null;
      for (const tipo of tipos) {
        // Escapar posibles caracteres especiales en tipo.key
        const keyEscaped = tipo.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Coincidencia solo si la palabra está separada por espacios, signos o al inicio/fin
        const regex = new RegExp(`(^| |,|\\.|;|:|!|\\?|\\n)${keyEscaped}( |,|\\.|;|:|!|\\?|\\n|$)`, 'i');
        if (regex.test(lower)) {
          match = tipo.key;
          break;
        }
      }
      if (match) {
        this.data.projectType = match;
        this.context.setContext({ briefType: match });
        this.messages.push({ sender: 'bot', text: `¡Genial! ¿Cuál es el objetivo principal de tu ${match.replace('ia', 'integración IA').replace('web', 'sitio web').replace('app', 'aplicación').replace('ecommerce', 'e-commerce').replace('tienda', 'tienda online').replace('institucional', 'web institucional').replace('landing', 'landing page')}?` });
      } else {
        // Si el usuario menciona "página", "sitio", "web" o similar, sugerir opciones
        if (/pagina|página|sitio|web|servicio|negocio|empresa|proyecto/.test(lower)) {
          this.messages.push({ sender: 'bot', text: '¿Te refieres a una landing page, un sitio web institucional, una tienda online o una aplicación? Por favor, indícalo con claridad para poder cotizar mejor.' });
        } else {
          this.messages.push({ sender: 'bot', text: 'Ofrecemos desarrollo de landings, webs institucionales, ecommerce, integración IA y apps a medida. ¿Qué tipo de proyecto te interesa?' });
        }
      }
      return;
    }
    // 2. Objetivo
    if (!this.data.goal) {
      this.data.goal = input;
      this.messages.push({ sender: 'bot', text: '¿Qué funcionalidades clave necesitas? (Ej: blog, contacto, pagos, admin, etc.)' });
      return;
    }
    // 3. Funcionalidades
    if (!this.data.features) {
      this.data.features = input;
      this.context.setContext({ features: input });
      this.messages.push({ sender: 'bot', text: '¡Perfecto! Con estos datos puedo prepararte una cotización estimada. ¿Te gustaría recibirla por email o WhatsApp? (Opcional, puedes responder "no" si prefieres solo ver la estimación aquí)' });
      return;
    }
    // 4. Recolección de datos de contacto solo si el usuario acepta
    if (!this.data.contactAsked) {
      const lower = input.toLowerCase();
      if (lower.includes('no')) {
        await this.sendQuote();
        this.data.contactAsked = true;
        return;
      }
      // Si parece un email o teléfono, lo guarda
      if (/\S+@\S+\.\S+/.test(input) || /\d{7,}/.test(input)) {
        this.data.contact = input;
        this.context.setContext({ contact: input });
        await this.sendQuote();
        this.data.contactAsked = true;
        return;
      }
      // Si el usuario responde "sí" o similar, pedir el dato
      if (lower.includes('sí') || lower.includes('ok') || lower.includes('whatsapp') || lower.includes('email')) {
        this.messages.push({ sender: 'bot', text: '¡Genial! Por favor, indícame tu email o WhatsApp para enviarte la propuesta.' });
        this.data.contactAsked = true;
        return;
      }
      // Si la respuesta no es clara, repreguntar
      this.messages.push({ sender: 'bot', text: '¿Te gustaría recibir la propuesta por email o WhatsApp? Si prefieres no dejar datos, responde "no".' });
      return;
    }
    // 5. Si ya se envió la cotización, ofrecer seguir conversando
    if (this.finished) {
      this.messages.push({ sender: 'bot', text: '¿Te gustaría afinar detalles, agendar una llamada o tienes otra consulta?' });
      return;
    }
    // Si el usuario se desvía, reconducir
    this.messages.push({ sender: 'bot', text: '¿Te gustaría continuar con la cotización o tienes otra consulta?' });
  }

  async sendQuote() {
    this.sending = true;
    this.sendError = false;
    this.userInputControl.disable();
    // Generar cotización avanzada
    const { projectType, features } = this.data;
    const quote = this.generateQuote(projectType, features);
    setTimeout(() => {
      this.sending = false;
      this.finished = true;
      this.userInputControl.enable();
      this.messages.push({ sender: 'bot', text: `¡Listo! Aquí tienes tu cotización estimada:` });
      this.messages.push({ sender: 'bot', text: quote });
      this.messages.push({ sender: 'bot', text: '¿Te gustaría recibir esta propuesta por email o agendar una llamada para afinar detalles?' });
    }, 1200);
  }

  generateQuote(type: string, features: string): string {
    // Lógica simple de ejemplo, puedes mejorarla según reglas reales
    let base = 800;
    let stack = 'Angular, Node.js, Vercel, SCSS';
    let extra = '';
    if (!type) type = '';
    if (type.toLowerCase().includes('ecommerce')) {
      base = 1800;
      stack = 'Angular, Node.js, Stripe, Firebase, SCSS';
      extra = 'Integración de pagos, catálogo, carrito, panel admin.';
    } else if (type.toLowerCase().includes('landing')) {
      base = 600;
      stack = 'Angular, SCSS, Vercel';
      extra = 'Optimización SEO, animaciones, formulario de contacto.';
    } else if (type.toLowerCase().includes('ia')) {
      base = 2500;
      stack = 'Angular, Node.js, OpenAI API, SCSS';
      extra = 'Integración de chatbots, análisis de datos, IA generativa.';
    } else if (type.toLowerCase().includes('app')) {
      base = 3000;
      stack = 'Angular, Node.js, Firebase, Capacitor, SCSS';
      extra = 'App móvil/web, autenticación, notificaciones push.';
    } else if (type.toLowerCase().includes('web')) {
      base = 1200;
      stack = 'Angular, Node.js, SCSS, Vercel';
      extra = 'Sitio institucional, blog, integración CMS.';
    }
    // Ajuste por funcionalidades
    if (features && features.length > 40) base += 400;
        return `
<b>Precio estimado:</b> USD $${base} - $${base + 600}<br>
<b>Tecnologías sugeridas:</b> ${stack}<br>
<b>Incluye:</b> ${extra}<br>
<b>Notas:</b> El precio puede variar según requerimientos finales. ¡Hablemos para afinar tu propuesta!`;
  }

  restart() {
    this.messages = [
      { sender: 'bot', text: '¡Hola! Soy tu asistente para cotizaciones. ¿En qué puedo ayudarte hoy?' }
    ];
    this.userInputControl.setValue('');
    this.userInputControl.enable();
    this.data = {};
    this.sending = false;
    this.finished = false;
    this.sendError = false;
  }
}
