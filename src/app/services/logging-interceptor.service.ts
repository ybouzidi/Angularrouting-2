import {
  HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.headers);
    return next.handle(req).pipe(tap(event => {
      //console.log(event);
      console.log('Logging response from interceptor');
      if (event.type === HttpEventType.Response) {
        //console.log(event.body)
      }
    }));
  }

}
