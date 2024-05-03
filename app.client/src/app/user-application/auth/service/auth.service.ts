import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { Token } from '../model/token';
import { AuthApiService } from './auth-api.service';
import { AuthStateService } from './auth.state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpService = inject(AuthApiService); 
  private stateService = inject(AuthStateService);
  constructor() {
    if(this.hasValidAccessToken())
      {
        this.stateService.setLoggedInState();
      }
  }

  state$ = this.stateService.state$;

  register(payload: {email: string, password: string})
  {
    this.stateService.setRegisterState();
    this.httpService.register(payload.email, payload.password).subscribe({next: (response) => {
      if(response.status == 200)
        {
          this.stateService.setLogInState();
        }
    }});
  }

  login(payload:{ email: string, password: string })
  {
    
    this.stateService.setLogInState();
    this.httpService.login(payload.email, payload.password).pipe(tap((response) => {
      if(response.body)
        { 
          this.stateService.setLoggedInState();
          this.setSession(response.body as Token);
        }
    })).subscribe();
  }

  logOut() {
    this.stateService.setNotLoggedInState();
    this.clearSession();
  }

  getAccessToken()
  {
    return localStorage.getItem('accessToken');
  }

  getTokenType()
  {
    return localStorage.getItem('tokenType');
  }

  hasValidAccessToken():boolean
  {
      const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
      return localStorage.getItem('accessToken') != null;
  }

  private clearSession()
  {
    localStorage.removeItem('tokenType');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('refreshToken');
  }

  private setSession(token: Token) {
    const expiresAt = token.expiresIn;

    localStorage.setItem('tokenType', token.tokenType);
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('refreshToken', token.refreshToken);
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.httpService.refreshToken(refreshToken).subscribe((response) => {
        if (response.body) {
          this.setSession(response.body as Token);
          this.stateService.setLoggedInState();
        }
      });
    } else {
      this.logOut(); // Wylogowanie użytkownika, jeśli brak refreshToken
    }
  }
}
