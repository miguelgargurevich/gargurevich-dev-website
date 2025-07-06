import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg [attr.width]="size" [attr.height]="size" [attr.viewBox]="viewBox" [attr.fill]="fill" [attr.stroke]="stroke" [attr.stroke-width]="strokeWidth" [class]="cssClass">
      <!-- Web Development -->
      <ng-container *ngIf="name === 'code'">
        <path d="M8 3l4 4-4 4m5-4h7" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Design -->
      <ng-container *ngIf="name === 'design'">
        <path d="M12 2l3 8-3 8-3-8 3-8z" fill="currentColor"/>
        <circle cx="12" cy="6" r="2" fill="currentColor"/>
      </ng-container>
      
      <!-- Mobile -->
      <ng-container *ngIf="name === 'mobile'">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="12" y1="18" x2="12.01" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- E-commerce -->
      <ng-container *ngIf="name === 'shopping'">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="m1 1 4 4 13-1 1 6H6" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Cloud -->
      <ng-container *ngIf="name === 'cloud'">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Analytics -->
      <ng-container *ngIf="name === 'analytics'">
        <path d="M3 3v18h18" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="m19 9-5 5-4-4-3 3" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Heart -->
      <ng-container *ngIf="name === 'heart'">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Innovation -->
      <ng-container *ngIf="name === 'lightbulb'">
        <path d="M9 21h6M12 3C8.5 3 6 5.5 6 9c0 2.5 2 4.5 2 6h8c0-1.5 2-3.5 2-6 0-3.5-2.5-6-6-6z" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Reliability -->
      <ng-container *ngIf="name === 'shield'">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Speed -->
      <ng-container *ngIf="name === 'zap'">
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Quality -->
      <ng-container *ngIf="name === 'star'">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Growth -->
      <ng-container *ngIf="name === 'trending-up'">
        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="17,6 23,6 23,12" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Support -->
      <ng-container *ngIf="name === 'users'">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="m23 21-3.5-3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="22" cy="11" r="3" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Email -->
      <ng-container *ngIf="name === 'mail'">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="22,6 12,13 2,6" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Phone -->
      <ng-container *ngIf="name === 'phone'">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Location -->
      <ng-container *ngIf="name === 'map-pin'">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="10" r="3" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- LinkedIn -->
      <ng-container *ngIf="name === 'linkedin'">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="2" y="9" width="4" height="12" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="4" cy="4" r="2" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- GitHub -->
      <ng-container *ngIf="name === 'github'">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- WhatsApp -->
      <ng-container *ngIf="name === 'message-circle'">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Menu -->
      <ng-container *ngIf="name === 'menu'">
        <line x1="3" y1="6" x2="21" y2="6" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="3" y1="12" x2="21" y2="12" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="3" y1="18" x2="21" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Close -->
      <ng-container *ngIf="name === 'x'">
        <line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Check -->
      <ng-container *ngIf="name === 'check'">
        <polyline points="20,6 9,17 4,12" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Send -->
      <ng-container *ngIf="name === 'send'">
        <line x1="22" y1="2" x2="11" y2="13" stroke-linecap="round" stroke-linejoin="round"/>
        <polygon points="22,2 15,22 11,13 2,9" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Refresh -->
      <ng-container *ngIf="name === 'refresh'">
        <polyline points="23,4 23,10 17,10" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="1,20 1,14 7,14" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Add -->
      <ng-container *ngIf="name === 'plus'">
        <line x1="12" y1="5" x2="12" y2="19" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Rocket -->
      <ng-container *ngIf="name === 'rocket'">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Calendar -->
      <ng-container *ngIf="name === 'calendar'">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="16" y1="2" x2="16" y2="6" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="8" y1="2" x2="8" y2="6" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="3" y1="10" x2="21" y2="10" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Clock -->
      <ng-container *ngIf="name === 'clock'">
        <circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="12,6 12,12 16,14" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Folder -->
      <ng-container *ngIf="name === 'folder'">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Tag -->
      <ng-container *ngIf="name === 'tag'">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="7" y1="7" x2="7.01" y2="7" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Chart -->
      <ng-container *ngIf="name === 'bar-chart'">
        <line x1="12" y1="20" x2="12" y2="10" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="18" y1="20" x2="18" y2="4" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="6" y1="20" x2="6" y2="16" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- External Link -->
      <ng-container *ngIf="name === 'external-link'">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="15,3 21,3 21,9" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="10" y1="14" x2="21" y2="3" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Sun (Light Mode) -->
      <ng-container *ngIf="name === 'sun'">
        <circle cx="12" cy="12" r="5" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="12" y1="1" x2="12" y2="3" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="12" y1="21" x2="12" y2="23" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="1" y1="12" x2="3" y2="12" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="21" y1="12" x2="23" y2="12" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Moon (Dark Mode) -->
      <ng-container *ngIf="name === 'moon'">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Arrow Right -->
      <ng-container *ngIf="name === 'arrow-right'">
        <line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="12,5 19,12 12,19" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Arrow Up -->
      <ng-container *ngIf="name === 'arrow-up'">
        <line x1="12" y1="19" x2="12" y2="5" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="5,12 12,5 19,12" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
      
      <!-- Fallback for unknown icons -->
      <ng-container *ngIf="!isKnownIcon()">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="9" y1="9" x2="15" y2="15" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="15" y1="9" x2="9" y2="15" stroke-linecap="round" stroke-linejoin="round"/>
      </ng-container>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    
    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: string = '24';
  @Input() fill: string = 'none';
  @Input() stroke: string = 'currentColor';
  @Input() strokeWidth: string = '2';
  @Input() cssClass: string = '';

  get viewBox(): string {
    return '0 0 24 24';
  }

  isKnownIcon(): boolean {
    const knownIcons = [
      'code', 'design', 'mobile', 'shopping', 'cloud', 'analytics',
      'heart', 'lightbulb', 'shield', 'zap', 'star', 'trending-up', 'users',
      'mail', 'phone', 'map-pin', 'linkedin', 'github', 'message-circle',
      'menu', 'x', 'check', 'send', 'refresh', 'plus', 'rocket',
      'calendar', 'clock', 'folder', 'tag', 'bar-chart', 'external-link',
      'sun', 'moon', 'arrow-right', 'arrow-up'
    ];
    return knownIcons.includes(this.name);
  }
}
