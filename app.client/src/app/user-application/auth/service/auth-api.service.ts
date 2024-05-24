import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Token } from '../model/token';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);
  constructor() {}

  register(email: string, password: string) {
    return this.http.post(
      '/register',
      { email, password },
      { observe: 'response' }
    );
  }

  login(email: string, password: string) {
    return this.http.post<Token>(
      '/login',
      { email, password },
      { observe: 'response' }
    );
  }

  refreshToken(refreshToken: string) {
    return this.http.post<Token>(
      '/refresh',
      { refreshToken },
      { observe: 'response' }
    );
  }
}
