import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './whatsapp-float.component.html',
  styleUrl: './whatsapp-float.component.scss'
})
export class WhatsappFloatComponent implements OnInit {
  isVisible = false;
  private readonly phoneNumber = '51966918363'; // Número de Perú
  private readonly message = '¡Hola! Me interesa conocer más sobre sus servicios de desarrollo web.';

  get whatsappUrl(): string {
    const encodedMessage = encodeURIComponent(this.message);
    return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
  }

  ngOnInit(): void {
    // Mostrar el botón después de 2 segundos
    setTimeout(() => {
      this.isVisible = true;
    }, 2000);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Mostrar el botón cuando el usuario haga scroll hacia abajo
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isVisible = scrollTop > 300;
  }

  trackWhatsAppClick(): void {
    // Analytics tracking
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'whatsapp_float_button',
        value: 1,
        custom_parameters: {
          interaction_type: 'click',
          button_type: 'floating_whatsapp'
        }
      });
    }

    // También se puede usar con otros sistemas de analytics
    console.log('WhatsApp button clicked - Modern icon system');
  }

  trackTooltipView(): void {
    // Track tooltip visibility for UX analytics
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'whatsapp_tooltip_view', {
        event_category: 'engagement',
        event_label: 'whatsapp_help_tooltip',
        value: 1
      });
    }
  }
}
