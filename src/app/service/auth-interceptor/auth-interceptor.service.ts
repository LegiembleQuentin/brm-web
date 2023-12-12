import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = sessionStorage.getItem('JWT');

    if (jwtToken) {
      // Cloner la requête et ajouter le token d'authentification dans l'en-tête
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwtToken}`)
      });

      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
