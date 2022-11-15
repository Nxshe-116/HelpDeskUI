import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Asset} from '../../../models/asset';
import {ConfirmDialogService} from '../services/confirm-dialog.service';
import {AssetTypesService} from '../services/asset-types.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AssetService} from '../services/asset.service';
import {AddAssetTypeComponent} from '../asset-types/add-asset-type/add-asset-type.component';
import {AddAssetComponent} from './add-asset/add-asset.component';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit, AfterViewInit {

  assetColumns: string[] = [
    'asset-name' ,
    'asset-make',
    'asset-model',
    'asset-serial-number' ,
    'asset-warranty' ,
    'asset-purchase' ,
    'edit',
    'delete']

  decodedTokenData: any;

  assetsDataSource = new MatTableDataSource<Asset>();
    @ViewChild('assetTypePaginator', {static: true}) assetTypePaginator!: MatPaginator;

    ngAfterViewInit() {
        this.assetsDataSource.paginator = this.assetTypePaginator;
        this.assetTypePaginator.page.subscribe(
            (event) => console.log(event)
        );
    }
  constructor(private confirmDialogService: ConfirmDialogService,
              private assetService: AssetService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar) { }

    assetsFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;

        this.assetsDataSource.filter = filterValue.trim().toLowerCase();

        if (this.assetsDataSource.paginator) {
            this.assetsDataSource.paginator.firstPage();
        }

    }
  ngOnInit() {
    this.getAssets()
  }

  getAssets() {
    this.assetService.getAssets().subscribe(
        asset => {


          // @ts-ignore
          console.log(asset.responseObject);
          // @ts-ignore
          this.assetsDataSource = new MatTableDataSource(asset.responseObject);
            this.assetsDataSource.paginator = this.assetTypePaginator;

        },

    )

  }
  addAsset() {
    const dialogRef = this.dialog.open(AddAssetComponent,
        {
          width: '600px',
          disableClose: true,
          data: { }
        });
    dialogRef.afterClosed().subscribe(result => {
      this.getAssets();
    },
        () => {},

    () => {
        this.getAssets()
      }
    )

  }

  deleteAssetType(element: any) {

    console.log('delete ele ', element)

    this.confirmDialogService.openConfirmDialog('Are you sure you want to delete ' + element.name)
        .afterClosed().subscribe(res => {
      if (res) { // If a user selects yes then we get true, and we proceed with deleting
        this.assetService.deleteAssetType(element.id).subscribe(
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
              this.getAssets();


            }
        );
      }
    });




  }
}
