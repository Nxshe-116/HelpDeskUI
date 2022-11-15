import { Component, OnInit} from '@angular/core';

import {Asset} from '../../../../models/asset';

import {ConfirmDialogService} from '../../services/confirm-dialog.service';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReturnServiceService} from '../../services/return-service.service';

import {PendingRequestsComponent} from '../../pending-requests/pending-requests.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RecordService} from '../../services/record.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-return-asset',
  templateUrl: './return-asset.component.html',
  styleUrls: ['./return-asset.component.css']
})
export class ReturnAssetComponent implements OnInit {

  decodedTokenData: any;
  assets: Asset[]
  Form: FormGroup;
  today = new Date();


  constructor(private confirmDialogService: ConfirmDialogService,
              private  service: RecordService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private returnService: ReturnServiceService,
              public dialogRef: MatDialogRef<PendingRequestsComponent>) { }

  ngOnInit(): void {
    this.Form = new FormGroup (
        {
          asset: new FormControl(null, Validators.required),
          dateReceived: new FormControl(null, Validators.required),
          dateReturned: new FormControl(null, Validators.required),
          receivedBy: new FormControl(null, Validators.required),
          returnedBy: new FormControl(null, Validators.required),
          received:  new FormControl(null, Validators.required),
        }
    )

    this.getAssets()
    this.decodedTokenData = this.getDecodedAccessToken();
  }


  onSubmit() {
      const tokenInfo = this.getDecodedAccessToken();
      this.Form.patchValue(
          {
              dateReceived: this.today,
              dateReturned: this.today,
              receivedBy:  tokenInfo.id,
              returnedBy:  tokenInfo.id,
             received:  false

  }
      );

this.returnService.returnAsset(this.Form.value).subscribe(
    resp => {
        // @ts-ignore
        console.log(resp.responseObject)
    },
    error => {
        this.snackbar.open('Error, Something went wrong', '', {
            duration: 5000, // 5 Seconds
            verticalPosition: 'top',
            panelClass: ['warn-snack']})
        console.log(error)
    },
    () => {

        this.snackbar.open(' Submitted', '', {
            duration: 5000, // 5 Seconds
            verticalPosition: 'top',
            panelClass: ['info-snack']
        });
    }
)
      console.log(this.Form.value)
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getAssets() {
    const tokenInfo = this.getDecodedAccessToken(); // decode token
    console.log('look at this: ' + tokenInfo.id );
    this.service.displayAssignedAssets(tokenInfo.id).subscribe(
        asset => {
          // @ts-ignore
          console.log(asset.responseObject);
          // @ts-ignore
          this.assets = asset.responseObject;
        },
    )
  }
  getDecodedAccessToken(): any {
    try {
      return jwt_decode( localStorage.getItem('token'));
    } catch (Error) {
      return null;
    }
  }
}
