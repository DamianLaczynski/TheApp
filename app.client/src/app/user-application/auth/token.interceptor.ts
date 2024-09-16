import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const demoInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);

  let authReq = req.clone();

  if (authService.hasValidAccessToken()) {
    const tokenType = authService.getTokenType();
    const token = authService.getAccessToken();
    authReq = req.clone({
      headers: req.headers.append('Authorization', `${tokenType} ${token}`),
    });
  }

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
