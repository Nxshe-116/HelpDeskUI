import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Supplier} from '../../../models/supplier';
import {ConfirmDialogService} from '../services/confirm-dialog.service';

import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SuppliersService} from '../services/suppliers.service';
import {AddSupplierComponent} from './add-supplier/add-supplier.component';

import {EditSupplierComponent} from './edit-supplier/edit-supplier.component';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit, AfterViewInit {
  supplierColumns: string[] = [ 'supplier-name' , 'supplier-address', 'supplier-contact', 'supplier-email', 'edit', 'delete']
supplierDataSource = new MatTableDataSource<Supplier>()

    @ViewChild('paginator', {static: false}) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.supplierDataSource.paginator = this.paginator;
        this.paginator.page.subscribe(
            (event) => console.log(event)
        );
    }
  constructor(private confirmDialogService: ConfirmDialogService,
              private supplierService: SuppliersService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar) { }

    suppliersFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;

        this.supplierDataSource.filter = filterValue.trim().toLowerCase();

        if (this.supplierDataSource.paginator) {
            this.supplierDataSource.paginator.firstPage();
        }

    }
  ngOnInit() {
    this.getSuppliers()
  }
    addSuppliers() {
        const dialogRef = this.dialog.open(AddSupplierComponent,
            {
                width: '600px',
                disableClose: true,
                data: { }
            });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Result from dialog is ${result}`)
            this.getSuppliers();
        });
    }
  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(
        resp => {


          // @ts-ignore
          console.log(resp.responseObject);
          // @ts-ignore
          this.supplierDataSource = new MatTableDataSource(resp.responseObject);
          this.supplierDataSource.paginator = this.paginator;
        },

    )

  }

    deleteSupplier(element: any) {

        console.log('delete ele ', element)

        this.confirmDialogService.openConfirmDialog('Are you sure you want to delete ' + element.name + ' from Suppliers')
            .afterClosed().subscribe(res => {
            if (res) { // If a user selects yes then we get true, and we proceed with deleting
                this.supplierService.deleteSupplier(element.id).subscribe(
                    resp => {
                        console.log(resp);

                        this.snackbar.open(element.name + '  Successfully Deleted!', '', {
                            duration: 3500, // 3 Seconds
                            verticalPosition: 'top',
                            panelClass: ['info-snack']

                        });
                    },
                    error => {
                        console.log(error);
                        if (error.status === 500) {
                            this.snackbar.open('You can\'t delete ' + element.accountName + ' as it is tied to parts of the system!', '', {
                                duration: 5000, // 5 Seconds
                                verticalPosition: 'top',
                                panelClass: ['warn-snack']

                            });
                        }
                    },
                    () => {
                        // UPDATE TABLE
                        this.getSuppliers();


                    }
                );
            }
        });




    }

    openEditType(element) {
        const dialogRef = this.dialog.open(EditSupplierComponent,
            {
                width: '600px',
                disableClose: true,
                data: { title: element.id,
                    message: element.name,
                    body: element.description

                }
            });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Result from dialog is ${result}`)
            this.getSuppliers();
        });
    }
}
