import {Component, Inject, OnInit} from '@angular/core';
import {AssetTypesService} from '../../services/asset-types.service';

import {AssetTypes} from '../../../../models/asset-types';
import {SuppliersService} from '../../services/suppliers.service';
import {Supplier} from '../../../../models/supplier';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AssetService} from '../../services/asset.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AssetsComponent} from '../assets.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';






@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {
    assetTypeList: AssetTypes[];
     supplier: Supplier[];
assetForm: FormGroup
    asset = '';
  constructor(private snackbar: MatSnackBar,
              private service: AssetService,
              private assetTypesService: AssetTypesService,
              private  supplierService: SuppliersService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AssetsComponent>
              ) { }

  ngOnInit(): void {
    this.assetTypes();

      this.Suppliers();

      this.assetForm = new FormGroup (
          {
              name: new FormControl(null, Validators.required),
              make: new FormControl(null, Validators.required),
              model: new FormControl(null, Validators.required),
              supplierId: new FormControl(null, Validators.required),
              assetTypeId: new FormControl(null, Validators.required),
              serialNumber: new  FormControl(null, Validators.required),
              warranty: new  FormControl(null, Validators.required),
              DateOfPurchase: new  FormControl(null, Validators.required),
          }
      )
  }
  assetTypes() {

    this.assetTypesService.getAssetTypes().subscribe(
        (data: any) => {
          this.assetTypeList = data.responseObject
        }
    )
  }

     onSubmit() {
        console.log(this.assetForm.value)
        if (this.assetForm.valid) {
            this.service.addAsset(this.assetForm.value).subscribe(
                () => {

                    this.snackbar.open('Asset Successfully Added', '', {
                        duration: 5000, // 5 Seconds
                        verticalPosition: 'top',
                        panelClass: ['info-snack']
                    });
                },
                error => {
                    this.snackbar.open('Error', '', {
                        duration: 5000, // 5 Seconds
                        verticalPosition: 'top',
                        panelClass: ['warn-snack']
                    });
                    console.log(error)
                },
                () => {  this.dialogRef.close();
             }
            )
        }
        this.dialogRef.close();
        }
  Suppliers() {
      this.supplierService.getSuppliers().subscribe(
          (data: any) => {
              this.supplier = data.responseObject
              console.log(this.supplier)
          }
      )
  }

    closeDialog() {
        this.dialogRef.close();
    }
}


