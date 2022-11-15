import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {RolesService} from '../services/roles.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  TokenData: any
    token: any
  loggedInUserRole!: any [] ;
   listOfUserRoles!: any [] ;

  private loginSuccess = false;
private success = false;
  constructor(private formBuilder: FormBuilder,
              private snackbar: MatSnackBar,
              private _router: Router,
              private rolesService: RolesService,
              private loginService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Username: [null, Validators.required],
      Password: [null, Validators.required],
    });


      this.loggedInUserRole = this.TokenData.role
  }


  loginUser(loginDetails: any) {


    if (this.loginForm.valid) {

      // @ts-ignore
        this.loginService.authService(loginDetails).subscribe(
          resp => {
              // @ts-ignore
              console.log('Login Resp ', resp);
              this.loginSuccess = true
              // @ts-ignore
              localStorage.setItem('token', resp.responseObject);
              // @ts-ignore
              this.TokenData = this.getDecodedAccessToken(resp.responseObject)
              // @ts-ignore
             this.success = resp.success
              // tslint:disable-next-line:triple-equals
              if (!this.success) {
                  this.snackbar.open('LOGIN FAILED, PROVIDE USERNAME AND PASSWORD!', '', {
                      duration: 5000, // 5 Seconds
                      verticalPosition: 'top',
                      panelClass: ['warn-snack'],

                  });

              } else {

              this.snackbar.open('Welcome ', '', {
                  duration: 5000, // 5 SecondsEm
                  verticalPosition: 'top',
                  panelClass: ['success-snack']

              });
             this._router.navigate(['/user']).then(window.location.reload)
          }
          },
          error => {
              console.log(error);
              this.snackbar.open('CHECK ON YOUR NETWORK SETTINGS!', '', {
                  duration: 5000, // 5 Seconds
                  verticalPosition: 'top',
                  panelClass: ['warn-snack']

              });
          },
          () => {

              sessionStorage.setItem('loggedInUser', this.loginForm.value.Username);
              localStorage.setItem('loggedInUser', this.loginForm.value.Username);

              sessionStorage.setItem('userRoles', JSON.stringify(this.TokenData.role))
          }

      );



    } else {
      this.snackbar.open('LOGIN FAILED, PROVIDE USERNAME AND PASSWORD!', '', {
        duration: 5000, // 5 Seconds
        verticalPosition: 'top',
        panelClass: ['warn-snack']

      });
    }




  }



  getDecodedAccessToken(token: any): any {
        try {
            return jwt_decode(token)
        } catch (Error) {
            return null;
        }
    }
}
