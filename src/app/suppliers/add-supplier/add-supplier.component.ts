import {Component, Inject, OnInit} from '@angular/core';
import {AssetTypesService} from '../../services/asset-types.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SuppliersService} from '../../services/suppliers.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AssetsComponent} from '../../assets/assets.component';
import {SuppliersComponent} from '../suppliers.component';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  Form: FormGroup
  constructor(private service: SuppliersService, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<SuppliersComponent>) { }

  ngOnInit(): void {
    this.Form = new FormGroup (
        {
          name: new FormControl(null, Validators.required),
          address: new FormControl(null, Validators.required),
          emailAddress: new FormControl(null, [Validators.required, Validators.email]),
          contact: new FormControl(null, Validators.required)
        }
    )
  }
  onSubmit() {
    console.log(this.Form.value)
    if (this.Form.valid) {
      this.service.addSupplier(this.Form.value).subscribe(
          () => {

            this.snackbar.open('Supplier Successfully Added', '', {
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
          () => { this.dialogRef.close();}

      )
    }

  }
}
