import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  private subscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.subscription = this.themeService.isDarkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }
}
