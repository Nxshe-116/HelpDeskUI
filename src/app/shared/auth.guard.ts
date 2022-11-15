import {Injectable, OnInit} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {RolesService} from '../services/roles.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {
  constructor(private  service: AuthService, private  _router: Router, private  userRoleService: RolesService) {
  }
  canActivate(next: ActivatedRouteSnapshot) {
    console.log('Activated')
    const response = this.service.isLoggedIn()
    if (response) {
      const roles = next.data['permittedRoles'] as Array<string>;
      let myRole =  JSON.parse(sessionStorage.getItem('userRoles'));
      myRole = null ? 'User' : myRole
      if (roles) {
        console.log(roles)
        console.log(myRole)
        if (this.userRoleService.roleMatch(roles, myRole)) { return true; } else {
          this._router.navigate(['/forbidden']);
          return false;
        }
      }
      return true;
    } else {
      this._router.navigate(['/log-in'])
      localStorage.clear();
      return false;
    }

  }

  ngOnInit(): void {
  }

}
