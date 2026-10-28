import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Authservice } from '../services/authservice';

const URL_BACK = 'http://localhost:8080';

@Injectable()
export class Authinterceptor implements HttpInterceptor {
  constructor(private auth: Authservice) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const esApiPropia = req.url.startsWith(URL_BACK);
    const token = this.auth.token;
    const peticion = esApiPropia && token ? this.conToken(req, token) : req;

    return next.handle(peticion).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401 || !esApiPropia || !token || req.url.startsWith(`${URL_BACK}/auth/`)) {
          return throwError(() => error);
        }
        return this.auth.refrescar().pipe(
          switchMap((nuevoToken) => {
            if (!nuevoToken) {
              this.auth.cerrarSesionExpirada();
              return throwError(() => error);
            }
            return next.handle(this.conToken(req, nuevoToken));
          }),
        );
      }),
    );
  }

  private conToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
