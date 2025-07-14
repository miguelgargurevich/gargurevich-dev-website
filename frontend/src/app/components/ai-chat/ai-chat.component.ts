
import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, NgZone, AfterViewInit, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
export class AiChatComponent implements AfterViewInit, OnInit, OnDestroy {
  private openListener: any;
  private isBrowser: boolean;

  chatForm: FormGroup;
  messages$: BehaviorSubject<ChatMessage[]>;
  loading = false;
  errorMsg = '';
  show = false;

  @ViewChild('scrollMe') scrollMe?: ElementRef<HTMLDivElement>;

  constructor(
    private fb: FormBuilder,
    private ai: AiChatService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.chatForm = this.fb.group({ message: [''] });
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.messages$ = new BehaviorSubject<ChatMessage[]>([
      { role: 'assistant', content: '¡Hola! ¿En qué puedo ayudarte hoy?' }
    ]);
  }

  private faqListener = (event: any) => {
    if (event.detail && event.detail.question) {
      this.ngZone.run(() => {
        if (!this.show) this.toggleChat();
        this.chatForm.get('message')?.setValue(event.detail.question);
        setTimeout(() => {
          const input = document.querySelector('.ai-chat-input input') as HTMLInputElement;
          if (input) input.focus();
        }, 100);
      });
    }
  };
  ngOnInit() {
    if (this.isBrowser) {
      this.openListener = () => {
        if (!this.show) this.toggleChat();
      };
      window.addEventListener('open-ai-chat', this.openListener);
      window.addEventListener('open-ai-chat', this.faqListener);
    }
  }


  ngOnDestroy() {
    if (this.isBrowser && this.openListener) {
      window.removeEventListener('open-ai-chat', this.openListener);
    }
    if (this.isBrowser && this.faqListener) {
      window.removeEventListener('open-ai-chat', this.faqListener);
    }
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
