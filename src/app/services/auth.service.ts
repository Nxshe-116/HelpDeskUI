import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged = false;
  constructor(private  http: HttpClient) { }

  public  authService(user: User): Observable<User[]> {
    return this.http.post<User[]> (environment.apiUrl + 'Authenticate/adminlog', user);
  }
  public  getUsers(): Observable<User[]> {
    return this.http.get<any[]> (environment.apiUrl + 'Authenticate/GetAllTelOneUsers');
  }

  isLoggedIn() {
    if ((sessionStorage.getItem('loggedInUser')) == null   /* && localStorage.getItem('token')==null*/) {
      return this.isLogged;
    } else {
      this.isLogged = true
      return this.isLogged;
    }
    return  this.isLogged
  }

}
