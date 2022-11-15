import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AssetTypesService} from '../../services/asset-types.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AssetTypesComponent} from '../asset-types.component';


@Component({
  selector: 'app-edit-asset-type',
  templateUrl: './edit-asset-type.component.html',
  styleUrls: ['./edit-asset-type.component.css']
})
export class EditAssetTypeComponent implements OnInit {
  editAssetTypeForm: FormGroup
    message: any
  constructor(private service: AssetTypesService,
              private snackbar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<AssetTypesComponent>
              ) { }

  ngOnInit(): void {
    this.editAssetTypeForm = new FormGroup(
        {
            ID: new FormControl(null, Validators.required),
          Name: new FormControl(null, Validators.required),
          description: new FormControl(null, Validators.required)
        }
    )
      this.message = this.data;
  }

    closeDialog() {
        this.dialogRef.close();
    }
  onSubmit() {
    console.log(this.editAssetTypeForm.value)
    if (this.editAssetTypeForm.valid) {
      this.service.editAssetType(this.editAssetTypeForm.value).subscribe(
          () => {

            this.snackbar.open('Asset Type Updated', '', {
              duration: 5000, // 5 Seconds
              verticalPosition: 'top',
              panelClass: ['info-snack']
            });
              this.dialogRef.close();
          },

      )
    }

  }
}
