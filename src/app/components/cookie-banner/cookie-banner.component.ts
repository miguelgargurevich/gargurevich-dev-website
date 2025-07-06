import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare let gtag: Function;

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss'
})
export class CookieBannerComponent implements OnInit {
  showBanner = false;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngOnInit(): void {
    // Solo verificar cookies en el navegador, no en SSR
    if (isPlatformBrowser(this.platformId)) {
      const cookiesAccepted = localStorage.getItem('cookies-accepted');
      if (!cookiesAccepted) {
        this.showBanner = true;
      }
    }
  }

  acceptAll(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookies-accepted', 'all');
      localStorage.setItem('analytics-enabled', 'true');
      localStorage.setItem('marketing-enabled', 'true');
      this.showBanner = false;
      this.enableAnalytics();
    }
  }

  acceptNecessary(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookies-accepted', 'necessary');
      localStorage.setItem('analytics-enabled', 'false');
      localStorage.setItem('marketing-enabled', 'false');
      this.showBanner = false;
    }
  }

  customize(): void {
    // Aquí se podría abrir un modal de configuración de cookies
    console.log('Personalizar cookies');
  }

  private enableAnalytics(): void {
    // Habilitar analytics solo si se aceptaron y estamos en el navegador
    if (isPlatformBrowser(this.platformId) && typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
  }
}
