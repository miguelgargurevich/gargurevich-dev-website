
import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AiChatService, ChatMessage } from '../../services/ai-chat.service';
import { LinebreaksPipe } from '../../pipes/linebreaks.pipe';
import { IconComponent } from '../icon/icon.component';
import { ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LinebreaksPipe, IconComponent],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class AiChatComponent implements AfterViewInit {
  chatForm: FormGroup;
  messages$ = new BehaviorSubject<ChatMessage[]>([
    { role: 'assistant', content: '¡Hola! ¿En qué puedo ayudarte hoy?' }
  ]);
  loading = false;
  errorMsg = '';
  show = false;

  @ViewChild('scrollMe') scrollMe?: ElementRef<HTMLDivElement>;

  constructor(private fb: FormBuilder, private ai: AiChatService, private ngZone: NgZone) {
    this.chatForm = this.fb.group({ message: [''] });
  }

  ngAfterViewInit() {
    // Scroll al abrir el chat
    if (this.show) this.scrollToBottom();
  }

  toggleChat() {
    this.show = !this.show;
    this.errorMsg = '';
    setTimeout(() => this.scrollToBottom(), 100);
  }

  send() {
    const msg = this.chatForm.value.message?.trim();
    if (!msg) return;
    const current = [
      ...this.messages$.value,
      { role: 'user' as const, content: msg }
    ];
    this.messages$.next(current);
    this.loading = true;
    this.errorMsg = '';
    this.chatForm.reset();
    this.chatForm.get('message')?.disable();
    this.ai.sendMessage(current, msg).subscribe({
      next: (res) => {
        const updated = [
          ...this.messages$.value,
          { role: 'assistant' as const, content: res }
        ];
        this.messages$.next(updated);
        this.loading = false;
        this.chatForm.get('message')?.enable();
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => this.scrollToBottom(), 50);
        });
      },
      error: (err) => {
        const updated = [
          ...this.messages$.value,
          { role: 'assistant' as const, content: typeof err === 'string' ? err : 'Ocurrió un error inesperado.' }
        ];
        this.messages$.next(updated);
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
