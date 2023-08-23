import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ClickOutsideDirective, SnackbarComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [ClickOutsideDirective, SnackbarComponent],
})
export class SharedModule {}
