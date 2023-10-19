import { Injectable } from '@angular/core';
import { CredentialResponse } from 'google-one-tap';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  loginWithGoogleCredentials(credentials: CredentialResponse) {}
  signUpWithGoogleCredentials(credentials: CredentialResponse) {}
}
