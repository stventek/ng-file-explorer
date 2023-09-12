import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IsMobileDirective } from './directives/is-mobile/is-mobile.directive';

@NgModule({
  declarations: [SnackbarComponent, IsMobileDirective],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [SnackbarComponent],
})
export class SharedModule {}
