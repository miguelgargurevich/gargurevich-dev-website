import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { RouterModule } from '@angular/router';
import { BriefService } from '../../services/brief.service';

@Component({
  selector: 'app-brief-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent, RouterModule],
  templateUrl: './brief-landing-page.component.html',
  styleUrl: './brief-landing-page.component.scss'
})
export class BriefLandingPageComponent {
  form: FormGroup;
  submitted = false;
  submitSuccess = false;
  submitError = false;

  constructor(private fb: FormBuilder, private briefService: BriefService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.maxLength(20)]],
      company: ['', [Validators.maxLength(60)]],
      business: ['', [Validators.required, Validators.maxLength(200)]],
      goal: ['', [Validators.required, Validators.maxLength(300)]],
      audience: ['', [Validators.required, Validators.maxLength(200)]],
      sections: ['', [Validators.maxLength(200)]],
      content: ['', [Validators.required]],
      branding: ['', [Validators.required]],
      contactForm: ['', [Validators.required]],
      integrations: [''],
      references: [''],
      timeline: [''],
      comments: [''],
      website: [''], // Honeypot
      captcha: ['', [Validators.required, this.simpleMathValidator]]
    });
  }

  get f() { return this.form.controls; }

  // Validador para la pregunta matemática (3 + 4 = 7)
  simpleMathValidator(control: any) {
    const value = control.value;
    return value && value.trim() === '7' ? null : { math: true };
  }

  onSubmit() {
    this.submitted = true;
    this.submitError = false;
    if (this.form.value.website) {
      return;
    }
    if (this.form.valid) {
      const form = this.form.value;
      const payload = {
        nombre: form.name,
        email: form.email,
        detalles: [
          `Empresa: ${form.company || '-'}\n` +
          `Rubro: ${form.business || '-'}\n` +
          `Objetivo: ${form.goal || '-'}\n` +
          `Audiencia: ${form.audience || '-'}\n` +
          `Secciones: ${form.sections || '-'}\n` +
          `Contenido: ${form.content || '-'}\n` +
          `Branding: ${form.branding || '-'}\n` +
          `Formulario de contacto: ${form.contactForm || '-'}\n` +
          `Integraciones: ${form.integrations || '-'}\n` +
          `Referencias: ${form.references || '-'}\n` +
          `Plazo de entrega: ${form.timeline || '-'}\n` +
          `Comentarios: ${form.comments || '-'}\n` +
          `Teléfono: ${form.phone || '-'}`
        ].join('\n'),
        tipo: 'cotizacion',
        service: 'Landing Page'
      };
      this.briefService.sendBrief(payload).subscribe({
        next: () => {
          this.submitSuccess = true;
          this.form.reset();
          this.submitted = false;
        },
        error: () => {
          this.submitError = true;
        }
      });
    } else {
      this.submitError = true;
    }
  }

  resetForm() {
    this.form.reset();
    this.submitted = false;
    this.submitSuccess = false;
    this.submitError = false;
  }
}
