import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AssetTypesService} from '../services/asset-types.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
// import jwt_decode from 'jwt-decode';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AssetTypes} from '../../../models/asset-types';
import {EditAssetTypeComponent} from './edit-asset-type/edit-asset-type.component';
import {AddAssetTypeComponent} from './add-asset-type/add-asset-type.component';
import {ConfirmDialogService} from '../services/confirm-dialog.service';

@Component({
  selector: 'app-asset-types',
  templateUrl: './asset-types.component.html',
  styleUrls: ['./asset-types.component.css']
})
export class AssetTypesComponent implements OnInit, AfterViewInit {
    assetTypeColumns: string[] = ['asset-type-name' , 'asset-type-description', 'edit', 'delete'

    ];
    decodedTokenData: any;
    assetType: AssetTypes[]
    assetTypeDataSource = new MatTableDataSource<any>();
    pageLength: any;
    @ViewChild('assetTypePaginator', {static: false}) assetTypePaginator!: MatPaginator;
    ngAfterViewInit() {
     this.assetTypeDataSource.paginator = this.assetTypePaginator;
        this.assetTypePaginator.page.subscribe(
            (event) => console.log(event)
        );
    }
  constructor(private confirmDialogService: ConfirmDialogService,
              private assetTypeService: AssetTypesService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar) { }


    assetTypeFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;

        this.assetTypeDataSource.filter = filterValue.trim().toLowerCase();

        if (this.assetTypeDataSource.paginator) {
            this.assetTypeDataSource.paginator.firstPage();
        }

    }
    ngOnInit() {

      this.getAssetTypesById()
  }

    decodeToken() {
        // this.decodedTokenData = jwt_decode(localStorage.getItem('token'));
    }


addAssetType() {
    const dialogRef = this.dialog.open(AddAssetTypeComponent,
        {
            width: '600px',
            disableClose: true,
            data: { }
        });
    dialogRef.afterClosed().subscribe(result => {
        console.log(`Result from dialog is ${result}`)
        this.getAssetTypesById();
    });
}
  getAssetTypesById() {
    this.assetTypeService.getAssetTypes().subscribe(
assetType => {



    // @ts-ignore
    this.pageLength = assetType.responseObject.length
    // @ts-ignore
    console.log(this.pageLength);
    // @ts-ignore
    this.assetTypeDataSource = new MatTableDataSource(assetType.responseObject);
    this.assetTypeDataSource.paginator = this.assetTypePaginator;
},

    )

  }
    openEditType(element) {
        const dialogRef = this.dialog.open(EditAssetTypeComponent,
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
            this.getAssetTypesById();
        });
    }

    deleteAssetType(element: any) {

        console.log('delete ele ', element)

        this.confirmDialogService.openConfirmDialog('Are you sure you want to delete ' + element.name)
            .afterClosed().subscribe(res => {
            if (res) { // If a user selects yes then we get true, and we proceed with deleting
                this.assetTypeService.deleteAssetType(element.id).subscribe(
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
                        this.getAssetTypesById();


                    }
                );
            }
        });




    }
}

