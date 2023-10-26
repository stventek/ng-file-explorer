import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialResponse } from 'google-one-tap';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpService: HttpClient) {}

  loginWithGoogleCredentials(credentials: CredentialResponse) {
    this.httpService
      .post<void>(`${environment.apiBase}/auth/google`, {
        token: credentials.credential,
      })
      .subscribe();
  }
}
