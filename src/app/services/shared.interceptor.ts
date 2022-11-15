import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export  class SharedInterceptor implements  HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const token =  localStorage.getItem('token');

        if (req.url.includes('authenticate')  || req.url.includes('Login')) {
            return next.handle(req);
        }

        if (token) {
           req = req.clone({
               setHeaders: { Authorization :  `Bearer ${token}`}
           })
       }
       return next.handle(req);
    }

}
