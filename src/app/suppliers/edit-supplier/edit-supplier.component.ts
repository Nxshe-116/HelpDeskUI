import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AssetTypesService} from '../../services/asset-types.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AssetTypesComponent} from '../../asset-types/asset-types.component';
import {SuppliersService} from '../../services/suppliers.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {
  Form: FormGroup
  message: any
  constructor(private service: SuppliersService,
              private snackbar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AssetTypesComponent>
  ) { }

  ngOnInit(): void {
    this.Form = new FormGroup(
        {
            id: new FormControl( '', Validators.required),
            name: new FormControl(null, Validators.required),
            address: new FormControl(null, Validators.required),
            emailAddress: new FormControl(null, [Validators.required, Validators.email]),
            contact: new FormControl(null, Validators.required)
        }
    )
    this.message = this.data;
  }
    closeDialog() {
        this.dialogRef.close();
    }
    onSubmit() {
        console.log(this.Form.value)
        if (this.Form.valid) {
            this.service.editSupplierDetails(this.Form.value).subscribe(
                () => {

                    this.snackbar.open('Supplier Updated', '', {
                        duration: 5000, // 5 Seconds
                        verticalPosition: 'top',
                        panelClass: ['info-snack']
                    });

                },
            error => {},
                () => {  this.dialogRef.close(); }
            )
        }

    }
}
