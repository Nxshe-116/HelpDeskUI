import {Component, Inject, OnInit} from '@angular/core';
import {AssetService} from '../../services/asset.service';
import {Asset} from '../../../../models/asset';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {UserComponent} from '../user.component';
import {RolesService} from '../../services/roles.service';
import jwt_decode from 'jwt-decode';
import {RecordService} from '../../services/record.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-assign-asset',
  templateUrl: './assign-asset.component.html',
  styleUrls: ['./assign-asset.component.css']
})
export class AssignAssetComponent implements OnInit {
  assetList: Asset[];
  user: any;
  Form: FormGroup
  message: any
  TokenData: any
  userId: any
    today = new Date();
  constructor(private assetService: AssetService,
              private  recordAssetService: RecordService,
              private rolesService: RolesService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UserComponent>,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
      this.assetTypes()
    this.message = this.data
    this.user = this.message.body
    this.Form = new FormGroup (
        {
          asset: new FormControl(null, Validators.required),
          dateAssigned: new FormControl(null, Validators.required),
            dateReceived: new FormControl(null, Validators.required),
          assignedBy: new FormControl(),
          givenTo: new FormControl(),
          received:  new FormControl(),
          assetState:  new FormControl(),
        }
    )
      this.TokenData = this.getDecodedAccessToken()
   this.userId =  this.getUserId()
  }


  assetTypes() {

    this.assetService.getAssets().subscribe(
        (data: any) => {
          console.log(data.responseObject)
          this.assetList = data.responseObject
        }
    )
}
  closeDialog() {
    this.dialogRef.close();
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode( localStorage.getItem('token'));
    } catch (Error) {
      return null;
    }
  }


    onSubmit() {
      const assign: any = this.Form.value
        const data = {
            received: assign.received === 'true' ?  true : false

        };
        this.Form.patchValue({
            assignedBy: this.TokenData.id,
            givenTo: this.userId,
            dateReceived: this.today,
            dateAssigned: this.today,
            received: data.received
        });
        this.recordAssetService.recordAsset(this.Form.value).subscribe(
            () => {

                this.snackbar.open('Asset assigned', '', {
                    duration: 5000, // 5 Seconds
                    verticalPosition: 'top',
                    panelClass: ['info-snack']
                });
            },
            error => {
                this.snackbar.open('Error, Something went wrong', '', {
                    duration: 5000, // 5 Seconds
                    verticalPosition: 'top',
                    panelClass: ['warn-snack']
                });
                console.log(error)
            },

            () => {
                this.closeDialog()
            }
        )




    }


    getUserId() {
            this.rolesService.getUserIdByUsername(this.user).subscribe(
                resp => {

              this.userId = resp.responseObject
                },

                )
return this.userId
    }
}
