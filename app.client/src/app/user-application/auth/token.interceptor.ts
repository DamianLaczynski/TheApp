import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.hasValidAccessToken()) {
      const tokenType = this.authService.getTokenType();
      const token = this.authService.getAccessToken();

      request = request.clone({
        setHeaders: {
          Authorization: `${tokenType} ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('refreshToken')) {
          // Wygaśniecie tokena - próba odświeżenia tokenu
          this.authService.refreshToken();
        }
        return throwError(() => error);
      })
    );
  }
}
