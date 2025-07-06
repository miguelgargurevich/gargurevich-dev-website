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

interface ServiceOption {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  serviceOptions: ServiceOption[] = [
    { id: 'landing', name: 'Landing Page', description: 'Página de conversión directa' },
    { id: 'institutional', name: 'Sitio Web Institucional', description: 'Presencia digital profesional' },
    { id: 'ecommerce', name: 'Tienda Online', description: 'E-commerce completo' },
    { id: 'webapp', name: 'Aplicación Web', description: 'Solución a medida' },
    { id: 'advanced', name: 'Proyecto Avanzado', description: 'IA, DevOps, integración' },
    { id: 'consultation', name: 'Consultoría', description: 'Asesoramiento técnico' },
    { id: 'other', name: 'Otro', description: 'Cuéntanos tu idea' }
  ];

  contactInfo: ContactInfo[] = [
    {
      icon: 'mail',
      title: 'Email',
      description: 'Envíanos un mensaje',
      value: 'hola@gargurevich.dev',
      link: 'mailto:hola@gargurevich.dev'
    },
    {
      icon: 'whatsapp',
      title: 'WhatsApp',
      description: 'Mensaje directo',
      value: '+51 966 918 363',
      link: 'https://wa.me/51966918363'
    },
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
      privacy: [false, Validators.requiredTrue]
    });
  }

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
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = false;
      
      try {
        // Simular envío de formulario
        await this.simulateFormSubmission();
        
        this.submitSuccess = true;
        this.contactForm.reset();
        
        // Resetear después de 5 segundos
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
        
      } catch (error) {
        this.submitError = true;
        console.error('Error al enviar formulario:', error);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  private simulateFormSubmission(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular 90% de éxito
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Error simulado'));
        }
      }, 2000);
    });
  }

  resetForm() {
    this.contactForm.reset();
    this.submitSuccess = false;
    this.submitError = false;
  }

  ngOnInit(): void {
    // SEO optimizado para la página de contacto
    this.seoService.updateSEO({
      title: 'Contacto - Gargurevich.Dev | Desarrollo Web Profesional',
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
        email: 'hola@gargurevich.dev',
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
