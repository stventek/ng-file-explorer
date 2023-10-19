import { Component, OnInit } from '@angular/core';
import { CredentialResponse } from 'google-one-tap';
import { AuthService } from './shared/services/auth/auth.service';

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
      google.accounts.id.initialize({
        client_id:
          '110962523806-e7pdksn34c3ktb8ib52a9q0v4ou2iek6.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
    };
  }

  handleCredentialResponse(credentials: CredentialResponse) {
    this.authService.loginWithGoogleCredentials(credentials);
  }
}
