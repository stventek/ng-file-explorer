import { Component } from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { ThemeManagerService } from 'src/app/shared/services/theme-manager/theme-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  faMoon = faMoon;
  faSun = faSun;

  $theme: Observable<'dark' | 'light'>;
  constructor(private themeManagerService: ThemeManagerService) {
    this.$theme = this.themeManagerService.$theme;
  }

  toggleTheme() {
    this.themeManagerService.toggleTheme();
  }
}
