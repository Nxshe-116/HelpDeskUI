import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AssetTypesService} from '../../services/asset-types.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AssetTypesComponent} from '../asset-types.component';

@Component({
  selector: 'app-add-asset-type',
  templateUrl: './add-asset-type.component.html',
  styleUrls: ['./add-asset-type.component.css']
})
export class AddAssetTypeComponent implements OnInit {
addAssetTypeForm: FormGroup
  constructor(private service: AssetTypesService, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AssetTypesComponent>) { }

  ngOnInit(): void {
  this.addAssetTypeForm = new FormGroup (
      {
        Name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required)
      }
  )
  }
onSubmit() {
console.log(this.addAssetTypeForm.value)
    if (this.addAssetTypeForm.valid) {
        this.service.addAssetTypes(this.addAssetTypeForm.value).subscribe(
            () => {

                this.snackbar.open('Asset Type Added', '', {
                    duration: 5000, // 5 Seconds
                    verticalPosition: 'top',
                    panelClass: ['info-snack']
                });

            },
            () => {},
        () => {  this.dialogRef.close(); }

        )
    }

}
}
