
import { Injectable } from "@angular/core";
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from "rxjs/operators";

@Injectable()
export class Backend implements HttpInterceptor{

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
let users:any[''] = JSON.parse(localStorage.getItem('users') || '[]');

return of(null).pipe(mergeMap(()=>{
if (request.url.endsWith('/users/register') && request.method === 'POST') {
let newuser = request.body;

let duplicateUser = users.filter((user:any) => { return user.username === newuser.username; }).length;
if (duplicateUser) {
      return throwError(alert("Username is alredy taken "))
}
newuser.id = users.length + 1;
newuser.credits=10
console.log("==>",users)
users.push(newuser);
localStorage.setItem('users', JSON.stringify(users));

return of(new HttpResponse({ status: 200 }));
}
// authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                let filteredUsers = users.filter((user:any) => {
                    return user.username === request.body.username && user.password === request.body.password;
                });
                if (filteredUsers.length) {
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        credits:user.credits,
                        password:user.password,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

return next.handle(request);
}));


}
}
export const fakeBackendProvider = {
provide: HTTP_INTERCEPTORS,
useClass: Backend,
multi: true
};