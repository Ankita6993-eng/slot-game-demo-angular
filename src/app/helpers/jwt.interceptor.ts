import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // let currentUser = JSON.parse(localStorage.getItem('currentUser'))
     let currentUser = JSON.parse(localStorage.getItem('currentUser')!);
     //let currentUser:string|any = localStorage.getItem('users');
     //let users:any[] = JSON.parse(localStorage.getItem('users') || '{}');
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
    return next.handle(request);
  }
}
