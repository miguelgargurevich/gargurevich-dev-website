import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-brief-ai-integration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  templateUrl: './brief-ai-integration.component.html',
  styleUrls: ['./brief-ai-integration.component.scss']
})
export class BriefAiIntegrationComponent {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.maxLength(20)]],
      company: ['', [Validators.maxLength(60)]],
      business: ['', [Validators.required, Validators.maxLength(200)]],
      goal: ['', [Validators.required, Validators.maxLength(300)]],
      integrationType: ['', [Validators.maxLength(200)]],
      content: ['', [Validators.required]],
      branding: ['', [Validators.required]],
      contactForm: ['', [Validators.required]],
      integrations: [''],
      references: [''],
      deadline: [''],
      comments: ['']
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // Aquí puedes enviar los datos a tu backend, WhatsApp, email, etc.
      // Por ahora solo mostramos el objeto en consola
      console.log('Brief IA/DevOps:', this.form.value);
      this.form.reset();
      this.submitted = false;
    }
  }
}
