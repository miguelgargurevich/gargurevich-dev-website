import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, NgZone } from '@angular/core';
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

  @ViewChild('scrollMe') scrollMe?: ElementRef<HTMLDivElement>;

  constructor(private fb: FormBuilder, private ai: AiChatService, private ngZone: NgZone) {
    this.chatForm = this.fb.group({ message: [''] });
  }

  toggleChat() {
    this.show = !this.show;
    this.errorMsg = '';
  }

  send() {
    const msg = this.chatForm.value.message?.trim();
    if (!msg) return;
    // Clonar el array para disparar ChangeDetection con OnPush
    this.messages = [...this.messages, { role: 'user', content: msg }];
    this.loading = true;
    this.errorMsg = '';
    this.chatForm.reset();
    this.chatForm.get('message')?.disable();
    this.ai.sendMessage(this.messages, msg).subscribe({
      next: (res) => {
        // Clonar el array para disparar ChangeDetection con OnPush
        this.messages = [...this.messages, { role: 'assistant', content: res }];
        this.loading = false;
        this.chatForm.get('message')?.enable();
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => this.scrollToBottom(), 50);
        });
      },
      error: (err) => {
        this.messages = [...this.messages, { role: 'assistant', content: typeof err === 'string' ? err : 'Ocurrió un error inesperado.' }];
        this.loading = false;
        this.errorMsg = typeof err === 'string' ? err : 'Ocurrió un error inesperado.';
        this.chatForm.get('message')?.enable();
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => this.scrollToBottom(), 50);
        });
      }
    });
  }

  private scrollToBottom() {
    if (this.scrollMe && this.scrollMe.nativeElement) {
      this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    }
  }

  trackByIdx(i: number) { return i; }
}
