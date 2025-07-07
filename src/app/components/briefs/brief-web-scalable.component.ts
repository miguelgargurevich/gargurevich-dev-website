import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-brief-web-scalable',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent, RouterModule],
  templateUrl: './brief-web-scalable.component.html',
  styleUrls: ['./brief-web-scalable.component.scss']
})
export class BriefWebScalableComponent {
  form: FormGroup;
  submitted = false;
  submitSuccess = false;
  submitError = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.maxLength(20)]],
      company: ['', [Validators.maxLength(60)]],
      business: ['', [Validators.required, Validators.maxLength(200)]],
      goal: ['', [Validators.required, Validators.maxLength(300)]],
      cms: ['', [Validators.maxLength(60)]],
      sections: ['', [Validators.maxLength(200)]],
      content: ['', [Validators.required]],
      branding: ['', [Validators.required]],
      contactForm: ['', [Validators.required]],
      integrations: [''],
      references: [''],
      deadline: [''],
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
      // Aquí puedes enviar los datos a tu backend, WhatsApp, email, etc.
      // Por ahora solo mostramos el objeto en consola
      console.log('Brief Web Escalable:', this.form.value);
      this.submitSuccess = true;
      this.form.reset();
      this.submitted = false;
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
