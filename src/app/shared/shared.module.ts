import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IsMobileDirective } from './directives/is-mobile/is-mobile.directive';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    SnackbarComponent,
    IsMobileDirective,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [SnackbarComponent, LoginComponent, SignUpComponent],
})
export class SharedModule {}
