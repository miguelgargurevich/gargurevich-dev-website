import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AiChatService, ChatMessage } from '../../services/ai-chat.service';
import { LinebreaksPipe } from '../../pipes/linebreaks.pipe';
import { IconComponent } from '../icon/icon.component';

import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LinebreaksPipe, IconComponent],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AiChatComponent {
  chatForm: FormGroup;
  messages: ChatMessage[] = [
    { role: 'assistant', content: '¡Hola! ¿En qué puedo ayudarte hoy?' }
  ];
  loading = false;
  errorMsg = '';
  show = false;

  constructor(private fb: FormBuilder, private ai: AiChatService) {
    this.chatForm = this.fb.group({ message: [''] });
  }

  toggleChat() {
    this.show = !this.show;
    this.errorMsg = '';
  }

  send() {
    const msg = this.chatForm.value.message?.trim();
    if (!msg) return;
    this.messages.push({ role: 'user', content: msg });
    this.loading = true;
    this.errorMsg = '';
    this.chatForm.reset();
    this.chatForm.get('message')?.disable();
    this.ai.sendMessage(this.messages, msg).subscribe({
      next: (res) => {
        this.messages.push({ role: 'assistant', content: res });
        this.loading = false;
        this.chatForm.get('message')?.enable();
      },
      error: (err) => {
        this.messages.push({ role: 'assistant', content: typeof err === 'string' ? err : 'Ocurrió un error inesperado.' });
        this.loading = false;
        this.errorMsg = typeof err === 'string' ? err : 'Ocurrió un error inesperado.';
        this.chatForm.get('message')?.enable();
      }
    });
  }

  trackByIdx(i: number) { return i; }
}
