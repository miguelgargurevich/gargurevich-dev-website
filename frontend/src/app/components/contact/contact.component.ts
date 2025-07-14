// ...existing code...
// ...existing code...
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SEOService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';
import { IconComponent } from '../icon/icon.component';

interface ContactInfo {
  icon: string;
  title: string;
  description: string;
  value: string;
  link?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  contactFormSubmitted = false;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  contactInfo: ContactInfo[] = [
    {
      icon: 'phone',
      title: 'Teléfono',
      description: 'Llamada directa',
      value: '+51 966 918 363',
      link: 'tel:+51966918363'
    },
    {
      icon: 'map-pin',
      title: 'Ubicación',
      description: 'Lima, Perú',
      value: 'Remoto y presencial',
      link: 'https://maps.google.com'
    }
  ];

  // Opciones de servicios para el select
  serviceOptions = [
    { id: 'landing', name: 'Landing Page', description: 'Página de conversión optimizada' },
    { id: 'web', name: 'Sitio Web Institucional', description: 'Presencia profesional online' },
    { id: 'ecommerce', name: 'E-commerce', description: 'Tienda online con pagos' },
    { id: 'app', name: 'Aplicación Web', description: 'Solución a medida' },
    { id: 'cms', name: 'Web con CMS', description: 'Gestión de contenido fácil' },
    { id: 'ia', name: 'Integración IA', description: 'Automatización y chatbots' }
  ];

  constructor(
    private fb: FormBuilder,
    private seoService: SEOService,
    private structuredDataService: StructuredDataService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[\+]?[0-9\s\-\(\)]+$/)]],
      company: [''],
      service: ['', Validators.required],
      budget: [''],
      timeline: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
      newsletter: [false],
      privacy: [false, Validators.requiredTrue],
      website: [''], // Honeypot
      // captcha eliminado
    });
  }

  // Validador captcha eliminado

  get formControls() {
    return this.contactForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return 'Este campo es requerido';
      }
      if (field.errors['email']) {
        return 'Ingresa un email válido';
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['pattern']) {
        return 'Formato inválido';
      }
    }
    return '';
  }

  async onSubmit() {
    this.contactFormSubmitted = true;
    if (this.contactForm.value.website) {
      this.submitError = true;
      setTimeout(() => {
        this.submitError = false;
      }, 4000);
      return;
    }
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = false;
      try {
        const form = this.contactForm.value;
        // HTML optimizado para compatibilidad máxima en clientes de correo
        const html = `
        <table width="100%" bgcolor="#f5f5f5" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;padding:0;margin:0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="margin:24px auto;border-radius:8px;box-shadow:0 2px 8px #0001;overflow:hidden;">
                <tr>
                  <td style="padding:32px 24px 16px 24px;">
                    <h2 style="color:#14213D;font-size:22px;margin:0 0 8px 0;">Nueva consulta de contacto</h2>
                    <p style="margin:0 0 18px 0;font-size:16px;color:#222;">Has recibido una nueva consulta desde el formulario de <b>Gargurevich.Dev</b>:</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;border-collapse:collapse;">
                      <tr><td style="font-weight:bold;padding:6px 0;width:140px;color:#14213D;">Nombre:</td><td>${form.name}</td></tr>
                      <tr><td style="font-weight:bold;padding:6px 0;color:#14213D;">Email:</td><td>${form.email}</td></tr>
                      <tr><td style="font-weight:bold;padding:6px 0;color:#14213D;">Teléfono:</td><td>${form.phone || '-'}</td></tr>
                      <tr><td style="font-weight:bold;padding:6px 0;color:#14213D;">Empresa:</td><td>${form.company || '-'}</td></tr>
                      <tr><td style="font-weight:bold;padding:6px 0;color:#14213D;">Servicio:</td><td>${form.service}</td></tr>
                      <tr><td style="font-weight:bold;padding:6px 0;color:#14213D;">Presupuesto:</td><td>${form.budget || '-'}</td></tr>
                      <tr><td style="font-weight:bold;padding:6px 0;color:#14213D;">Plazo:</td><td>${form.timeline || '-'}</td></tr>
                      <tr><td style="font-weight:bold;padding:6px 0;vertical-align:top;color:#14213D;">Mensaje:</td><td>${form.message.replace(/\n/g,'<br>')}</td></tr>
                      <tr><td style="font-weight:bold;padding:6px 0;color:#14213D;">Newsletter:</td><td>${form.newsletter ? 'Sí' : 'No'}</td></tr>
                    </table>
                    <p style="margin-top:24px;font-size:13px;color:#888;">Enviado desde <a href='https://gargurevich.dev' style='color:#FCA311;text-decoration:none;">gargurevich.dev</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        `;
        // Cambia este email por el tuyo de FormSubmit
        const formSubmitUrl = 'https://formsubmit.co/ajax/contacto@gargurevich.dev';
        const payload: Record<string, any> = {
          _subject: `Nueva consulta de contacto de ${form.name}`,
          _template: 'box',
          _replyto: form.email,
          _cc: form.email,
          message: 'Consulta de contacto',
          html: html
        };
        // Agrega los campos del formulario plano para respaldo
        Object.entries(form).forEach(([key, value]) => {
          if (typeof value !== 'object') (payload as Record<string, any>)[key] = value;
        });
        const response = await fetch(formSubmitUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          throw new Error('No se pudo enviar el mensaje');
        }
        this.submitSuccess = true;
        this.contactForm.reset();
        this.contactFormSubmitted = false;
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      } catch (error) {
        this.submitError = true;
        console.error('Error al enviar mensaje de contacto:', error);
      } finally {
        this.isSubmitting = false;
      }
    } else if (!this.contactForm.valid) {
      this.submitError = true;
      setTimeout(() => {
        this.submitError = false;
      }, 4000);
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  // Detecta el modo de color preferido del usuario (dark/light)
  getPreferredTheme(): 'dark' | 'light' {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme as 'dark' | 'light';
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    }
    return 'dark';
  }

  resetForm() {
    this.contactForm.reset();
    this.submitSuccess = false;
    this.submitError = false;
    this.contactFormSubmitted = false;
  }

  ngOnInit(): void {
    // SEO optimizado para la página de contacto
    this.seoService.updateSEO({
      title: 'Contacto - GargurevichDev | Desarrollo Web Profesional',
      description: 'Contáctanos para tu proyecto de desarrollo web. Ofrecemos landing pages, e-commerce, aplicaciones web y más. Respuesta garantizada en 24 horas.',
      keywords: 'contacto desarrollo web, presupuesto web, proyecto digital, gargurevich dev',
      url: 'https://gargurevich.dev/contact',
      type: 'website'
    });

    // Structured data para la página de contacto
    this.structuredDataService.addOrganizationData();
    this.addContactPageStructuredData();
    this.addFAQStructuredData();
  }

  ngOnDestroy(): void {
    this.structuredDataService.removeStructuredData();
  }

  private addContactPageStructuredData(): void {
    this.structuredDataService.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contacto - Gargurevich.Dev',
      description: 'Página de contacto para solicitar presupuestos y consultas sobre desarrollo web',
      url: 'https://gargurevich.dev/contact',
      mainEntity: {
        '@type': 'Organization',
        name: 'Gargurevich.Dev',
        email: 'contacto@gargurevich.dev',
        telephone: '+51-1-234-5678',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+51-1-234-5678',
          contactType: 'customer service',
          availableLanguage: ['Spanish', 'English'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
          }
        }
      }
    });
  }

  private addFAQStructuredData(): void {
    const faqs = [
      {
        question: '¿Cuánto tiempo toma desarrollar un sitio web?',
        answer: 'El tiempo de desarrollo varía según la complejidad. Una landing page toma 1-2 semanas, un sitio institucional 2-4 semanas, y una aplicación web personalizada puede tomar 1-3 meses.'
      },
      {
        question: '¿Ofrecen mantenimiento post-lanzamiento?',
        answer: 'Sí, ofrecemos planes de mantenimiento que incluyen actualizaciones de seguridad, backups, monitoring y soporte técnico continuo.'
      },
      {
        question: '¿Trabajan con empresas fuera de Perú?',
        answer: 'Absolutamente. Trabajamos de forma remota con clientes en toda Latinoamérica y tenemos experiencia con proyectos internacionales.'
      },
      {
        question: '¿Qué tecnologías utilizan?',
        answer: 'Utilizamos tecnologías modernas como Angular, React, Node.js, TypeScript, y frameworks CSS como Tailwind. Siempre elegimos la mejor tecnología para cada proyecto.'
      },
      {
        question: '¿Proporcionan hosting y dominio?',
        answer: 'Podemos ayudarte con la configuración de hosting y dominio, o trabajar con tu proveedor actual. Recomendamos las mejores opciones según tu proyecto.'
      }
    ];
    this.structuredDataService.addFAQData(faqs);
  }
}
