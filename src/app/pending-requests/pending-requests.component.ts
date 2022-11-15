import jwt_decode from 'jwt-decode';

import {MatTableDataSource} from '@angular/material/table';

import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RequestsService} from '../services/requests.service';
import {ConfirmDialogService} from '../services/confirm-dialog.service';
import {RequestAssetComponent} from '../user/request-asset/request-asset.component';
import {ConfirmComponent} from '../user/confirm/confirm.component';
import {MatPaginator} from '@angular/material/paginator';
import {AssignedAssetsComponent} from '../assigned-assets/assigned-assets.component';
import {ReturnAssetComponent} from '../dashboard/return-asset/return-asset.component';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css']
})
export class PendingRequestsComponent implements OnInit, AfterViewInit {
  TokenData: any
  requestColumns: string[] = ['request-id', 'request-message', 'request-date', 'request-type', 'request-status', 'delete']
  requestsDataSource = new MatTableDataSource<any[]>()

  @ViewChild('paginator', {static: false}) paginator!: MatPaginator;

  constructor(private requestService: RequestsService,
              private confirmDialogService: ConfirmDialogService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar) { }

  ngAfterViewInit() {
    this.requestsDataSource.paginator = this.paginator;

  }

  usersFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.requestsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.requestsDataSource.paginator) {
      this.requestsDataSource.paginator.firstPage();
    }

  }
  ngOnInit(): void {
    this.TokenData = this.getDecodedAccessToken()
    this.displayRequest()

  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode( localStorage.getItem('token'));
    } catch (Error) {
      return null;
    }
  }
  displayRequest() {

    this.requestService.displayRequestById(this.TokenData.id).subscribe(
        resp => {

          // @ts-ignore
          console.log('These requests response' + resp);
          // @ts-ignore
          console.log(resp.responseObject);
          // @ts-ignore
          this.requestsDataSource = new MatTableDataSource(resp.responseObject);
          this.requestsDataSource.paginator = this.paginator;
        },
    )
  }

  deleteRequest(element: any) {

    console.log('delete ele ', element)

    this.confirmDialogService.openConfirmDialog('Are you sure you want to remove this request ')
        .afterClosed().subscribe(res => {
      if (res) { // If a user selects yes then we get true, and we proceed with deleting
        this.requestService.deleteRequest(element.id).subscribe(
            resp => {
              console.log(resp);

              this.snackbar.open('  Request Removed', '', {
                duration: 3500, // 3 Seconds
                verticalPosition: 'top',
                panelClass: ['success-snack']

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
              this.displayRequest();


            }
        );
      }
    });




  }

  openRequest() {
    const dialogRef = this.dialog.open(RequestAssetComponent, {
      width: '600px',
      data: {title: 'Example'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  confirm() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '800px',
      height: '600px',
      data: {title: 'Example'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  return() {
    this.dialog.open(ReturnAssetComponent,
        {
          width: '600px',
          disableClose: false,
          data: {
          }
        },
    );
  }

  viewAssets() {
    this.dialog.open(AssignedAssetsComponent,
        {
          width: '600px',
          disableClose: false,
          data: {
              teloneUserId: this.TokenData.id,
              username: this.TokenData.name,
          }
        },
    );
  }
}



