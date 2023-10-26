import { Component, OnInit } from '@angular/core';
import { CredentialResponse } from 'google-one-tap';
import { AuthService } from './shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const handleCredentialResponse = this.handleCredentialResponse.bind(this);
    window.onload = function () {
      globalThis.google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: handleCredentialResponse,
      });
    };
  }

  handleCredentialResponse(credentials: CredentialResponse) {
    this.authService.loginWithGoogleCredentials(credentials);
  }
}
