import {Component, Inject, OnInit} from '@angular/core';
import {AssetTypes} from '../../../../models/asset-types';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AssetTypesService} from '../../services/asset-types.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AssetService} from '../../services/asset.service';
import {SuppliersService} from '../../services/suppliers.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AssetsComponent} from '../../assets/assets.component';
import jwt_decode from 'jwt-decode';
import {RequestsService} from '../../services/requests.service';

@Component({
  selector: 'app-request-asset',
  templateUrl: './request-asset.component.html',
  styleUrls: ['./request-asset.component.css']
})


export class RequestAssetComponent implements OnInit {
  Form: FormGroup
  assetTypeList: AssetTypes[];
  TokenData: any
  constructor(private snackbar: MatSnackBar,
              private service: AssetService,
              private  supplierService: SuppliersService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AssetsComponent>,
       private requestService: RequestsService,
       private  assetTypesService: AssetTypesService) {}

  ngOnInit(): void {
    this.assetTypes()
    this.Form = new FormGroup (
        {
            requestMessage: new FormControl(null, Validators.required),
            assetype: new FormControl(null, Validators.required),
            requestedBy: new FormControl()
        }
    )

     this.TokenData = this.getDecodedAccessToken()
  }
  assetTypes() {

    this.assetTypesService.getAssetTypes().subscribe(
        (data: any) => {
          this.assetTypeList = data.responseObject
          console.log(this.assetTypeList)
        }
    )
  }
    onSubmit() {
        this.Form.patchValue({
            requestedBy: this.TokenData.id
        });
        console.log(this.Form.value)
        const tokenInfo = this.getDecodedAccessToken(); // decode token
        console.log('look at this: ' + tokenInfo.id );
        console.log(tokenInfo);

        if (this.Form.valid) {

            this.requestService.requestAsset(this.Form.value).subscribe(
                () => {

                    this.snackbar.open('Request Submitted', '', {
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
            )
        }
  }

    getDecodedAccessToken(): any {
        try {
            return jwt_decode( localStorage.getItem('token'));
        } catch (Error) {
            return null;
        }
    }
}
