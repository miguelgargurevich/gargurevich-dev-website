import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppContext {
  currentSection: string; // Ej: 'brief', 'contact', 'home', etc.
  briefType?: string;     // Ej: 'landing-page', 'ecommerce', etc.
  userName?: string;
  email?: string;
  sentiment?: string;     // Ej: 'positivo', 'neutral', 'negativo'
  lastAction?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class ContextService {
  private context$ = new BehaviorSubject<AppContext>({ currentSection: 'home' });

  getContext() {
    return this.context$.asObservable();
  }

  setContext(partial: Partial<AppContext>) {
    const prev = this.context$.value;
    this.context$.next({ ...prev, ...partial });
  }

  getCurrent() {
    return this.context$.value;
  }

  resetContext() {
    this.context$.next({ currentSection: 'home' });
  }
}
