import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient ) {}

  getUserRolesByUsername(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}Roles/TeloneUserRoles?userName=` + username);
  }
  roleMatch(allowedRoles, userRoles): boolean {
    let isMatch = false;
    for (const allowedRole of allowedRoles) {
      if (userRoles.includes(allowedRole)) {
        isMatch = true;
        // return false;
      }
    }


    return isMatch;
  }

  getUserIdByUsername(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}Roles/TeloneUserId?userName=` + username);
  }
}
