import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(true); // Dark mode como predeterminado
  public isDarkMode$ = this.isDarkMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Solo ejecutar en el browser
      this.initializeTheme();
    }
  }

  private initializeTheme(): void {
    // Dark mode es siempre el predeterminado, pero respetamos si el usuario eligió light theme
    const savedTheme = localStorage.getItem('theme');
    
    // Solo usar light theme si el usuario lo eligió explícitamente
    const initialDarkMode = savedTheme === 'light' ? false : true;
    this.setDarkMode(initialDarkMode);
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this.isDarkMode.value);
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode.next(isDark);
    
    if (isPlatformBrowser(this.platformId)) {
      // Solo ejecutar en el browser
      this.applyThemeToDOM(isDark);
      this.saveThemePreference(isDark);
    }
  }

  private applyThemeToDOM(isDark: boolean): void {
    // Dark mode es el tema base (sin clase), light mode usa .light-theme
    if (isDark) {
      document.body.classList.remove('light-theme');
      // No necesitamos agregar 'dark-theme' porque es el estilo base
    } else {
      document.body.classList.add('light-theme');
    }
  }

  private saveThemePreference(isDark: boolean): void {
    // Guardar preferencia
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  getCurrentTheme(): boolean {
    return this.isDarkMode.value;
  }
}
