import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  themeSource: BehaviorSubject<'dark' | 'light'>;
  $theme: Observable<'dark' | 'light'>;

  constructor() {
    let theme = localStorage.getItem('theme') as 'dark' | 'light';
    if (!(theme === 'dark' || theme === 'light')) {
      theme = this.detectTheme();
    }
    this.themeSource = new BehaviorSubject<'dark' | 'light'>(theme);
    this.$theme = this.themeSource.asObservable();
    localStorage.setItem('theme', theme);
    document.querySelector('html')!.setAttribute('data-theme', theme);
  }

  detectTheme() {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode ? 'dark' : 'light';
  }

  toggleTheme() {
    let theme = this.themeSource.getValue();
    theme = theme === 'dark' ? 'light' : 'dark';
    document.querySelector('html')!.setAttribute('data-theme', theme);
    this.themeSource.next(theme);
    localStorage.setItem('theme', theme);
  }
}
