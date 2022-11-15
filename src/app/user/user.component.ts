import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RequestAssetComponent} from './request-asset/request-asset.component';
import jwt_decode from 'jwt-decode';
import {ConfirmComponent} from './confirm/confirm.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  TokenData: any
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    if (!localStorage.loaded) {
      localStorage.setItem('loaded', 'yes')
      window.location.reload();
    }
   this.TokenData = this.getDecodedAccessToken()
  }
openRequest() {
  const dialogRef = this.dialog.open(RequestAssetComponent, {
    width: '600px',
    data: {title: 'Example'},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');

  });
}
  getDecodedAccessToken(): any {
    try {
      return jwt_decode( localStorage.getItem('token'));
    } catch (Error) {
      return null;
    }
  }
  confirm() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '800px',
      height: '600px',
      data: {title: 'Example'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}



