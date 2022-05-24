import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._authService.userSub.pipe(
      take(1),
      exhaustMap(
        user => {
          if (!user) {
            return next.handle(req);
          }
          let modifiedReq = req.clone({
            params: req.params.append('auth', user.token)
          });
          return next.handle(modifiedReq);
        }
      )
    );
  }
}
