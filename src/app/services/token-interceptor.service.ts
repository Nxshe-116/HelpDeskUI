import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


  constructor() { }
  intercept(req, next)  {

      const token =  localStorage.getItem('token');


    const tokenizedReq = req.clone({
        setHeaders:
    {
      Authorization: `Bearer ${token}`
    }
    })

  return next.handle(tokenizedReq)
  }

}
