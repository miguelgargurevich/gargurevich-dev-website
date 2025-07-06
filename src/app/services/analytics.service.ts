import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare let gtag: Function;
declare let clarity: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private gtmId = 'GTM-XXXXXXX'; // Reemplazar con ID real
  private gaId = 'GA_MEASUREMENT_ID'; // Reemplazar con ID real
  private clarityId = 'CLARITY_PROJECT_ID'; // Reemplazar con ID real

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    this.initializeAnalytics();
    this.trackRouteChanges();
  }

  private initializeAnalytics(): void {
    // Google Tag Manager
    this.loadGTM();
    
    // Google Analytics 4
    this.loadGA4();
    
    // Microsoft Clarity
    this.loadClarity();
  }

  private loadGTM(): void {
    // GTM Script
    const gtmScript = this.document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${this.gtmId}`;
    this.document.head.appendChild(gtmScript);

    // GTM NoScript
    const gtmNoScript = this.document.createElement('noscript');
    gtmNoScript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${this.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    this.document.body.appendChild(gtmNoScript);

    // DataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function() {
      (window as any).dataLayer.push(arguments);
    };
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', this.gtmId);
  }

  private loadGA4(): void {
    const gaScript = this.document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    this.document.head.appendChild(gaScript);

    const gaConfigScript = this.document.createElement('script');
    gaConfigScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.gaId}', {
        page_title: document.title,
        page_location: window.location.href
      });
    `;
    this.document.head.appendChild(gaConfigScript);
  }

  private loadClarity(): void {
    const clarityScript = this.document.createElement('script');
    clarityScript.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${this.clarityId}");
    `;
    this.document.head.appendChild(clarityScript);
  }

  private trackRouteChanges(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  // Tracking de page views
  trackPageView(url: string): void {
    if (typeof gtag !== 'undefined') {
      gtag('config', this.gaId, {
        page_path: url,
        page_title: this.document.title,
        page_location: `${window.location.origin}${url}`
      });
    }
  }

  // Tracking de eventos personalizados
  trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  // Tracking de conversiones
  trackConversion(eventName: string, parameters?: any): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'conversion',
        ...parameters
      });
    }
  }

  // Tracking de formularios
  trackFormSubmission(formName: string, success: boolean): void {
    this.trackEvent(
      success ? 'form_submit_success' : 'form_submit_error',
      'form_interaction',
      formName,
      success ? 1 : 0
    );
  }

  // Tracking de clicks en CTAs
  trackCTAClick(ctaText: string, location: string): void {
    this.trackEvent('cta_click', 'user_engagement', `${ctaText} - ${location}`);
  }

  // Tracking de descargas
  trackDownload(fileName: string, fileType: string): void {
    this.trackEvent('file_download', 'engagement', `${fileName}.${fileType}`);
  }

  // Tracking de tiempo en página
  trackTimeOnPage(pageName: string, timeInSeconds: number): void {
    this.trackEvent('time_on_page', 'engagement', pageName, timeInSeconds);
  }

  // Tracking de scroll depth
  trackScrollDepth(percentage: number): void {
    this.trackEvent('scroll_depth', 'engagement', `${percentage}%`, percentage);
  }

  // Tracking de errores
  trackError(errorMessage: string, errorType: string): void {
    this.trackEvent('error', 'technical', `${errorType}: ${errorMessage}`);
  }

  // Enhanced ecommerce tracking (para futuras tiendas)
  trackPurchase(transactionId: string, value: number, currency: string = 'PEN'): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency
      });
    }
  }

  // User identification para analytics avanzados
  setUserId(userId: string): void {
    if (typeof gtag !== 'undefined') {
      gtag('config', this.gaId, {
        user_id: userId
      });
    }
  }

  // Custom dimensions
  setCustomDimension(index: number, value: string): void {
    if (typeof gtag !== 'undefined') {
      gtag('config', this.gaId, {
        [`custom_map.dimension${index}`]: value
      });
    }
  }
}
