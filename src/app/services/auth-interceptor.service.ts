import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request interceptor');
    /* let modifiedRequest = req.clone({
      headers: req.headers.append('auth', 'abc'),
      params: req.params.append('custom1', 'nhbgvfbgnhvfvhnhbfvaaaa')
    }) */
    return next.handle(req);
  }

}
