import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {AssetService} from '../services/asset.service';
import {RequestsService} from '../services/requests.service';
import {AuthService} from '../services/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

import {MatDialog} from '@angular/material/dialog';

import {AssignedAssetsComponent} from '../assigned-assets/assigned-assets.component';

import {ReturnServiceService} from '../services/return-service.service';
import {ConfirmDialogService} from '../services/confirm-dialog.service';
import jwt_decode from 'jwt-decode';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RecordService} from '../services/record.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit, AfterViewInit {
    assets: any;
    requests: any;
    Form: FormGroup;
    assignedAssets: any;
    TokenData: any;
    userId: any;
    returnedAssets: any
    today = new Date();
    usersColumns: string[] = [
        'user' ,
        'view']

    assetColumns: string[] = [
        'asset' ,
        'returnedBy',
        'returnedDate',
    'confirm']

    decodedTokenData: any;

    usersDataSource = new MatTableDataSource<any>();
    assetsDataSource = new MatTableDataSource<any>();
    @ViewChild('usersPaginator', {static: true}) usersPaginator!: MatPaginator;
    @ViewChild('assetsPaginator', {static: true}) assetsPaginator!: MatPaginator;

    ngAfterViewInit() {
        this.usersDataSource.paginator = this.usersPaginator;
        this.usersPaginator.page.subscribe(
            (event) => console.log(event)
        );
    }

  constructor(private assetService: AssetService,
              private requestService: RequestsService,
              private  service: AuthService,
              private snackbar: MatSnackBar,
              private recordService: RecordService,
              private confirmDialogService: ConfirmDialogService,
              private dialog: MatDialog,
              private  returnService: ReturnServiceService) { }


    assetsFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;

        this.assetsDataSource.filter = filterValue.trim().toLowerCase();

        if (this.assetsDataSource.paginator) {
            this.assetsDataSource.paginator.firstPage();
        }

    }

    usersFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;

        this.usersDataSource.filter = filterValue.trim().toLowerCase();

        if (this.usersDataSource.paginator) {
            this.usersDataSource.paginator.firstPage();
        }

    }
  ngOnInit() {

      this.Form = new FormGroup (
          {
              received: new FormControl(null, Validators.required),
              receivedBy: new FormControl(null, Validators.required),
              dateReceived: new FormControl(),
              id: new FormControl(null, Validators.required),
          })
      this.getAssets()
      this.getRequests()
      this.getUsers()
      this.getReturnedAssets()
      this.TokenData = this.getDecodedAccessToken()
      this.getAllAssignedAssets()
      }

    getAssets() {
        this.assetService.getAssets().subscribe(
            asset => {
                // @ts-ignore
                this.assets = asset.responseObject.length
                // @ts-ignore
                console.log(asset.responseObject);
                },

        )

    }

    getRequests() {
        this.requestService.displayRequests().subscribe(
            resp => {

         // @ts-ignore
                this.requests = resp.responseObject.length;
                // @ts-ignore
                console.log(resp.responseObject);
            },

        )

    }
getUsers() {
      this.service.getUsers().subscribe(
          resp => {
              // @ts-ignore
              console.log(resp.responseObject);
              // @ts-ignore
              this.usersDataSource = new MatTableDataSource(resp.responseObject);
              this.usersDataSource.paginator = this.usersPaginator;
          }
      )
}

    viewAssignedAssets(element: any) {
       this.dialog.open(AssignedAssetsComponent,
            {
                width: '600px',
                disableClose: false,
                data: {
                    teloneUserId: element.teloneUserId,
                    username: element.username
                }
            },
       );
    }

    getReturnedAssets() {
        this.returnService.getReturnedAssets().subscribe(
            asset => {
                // @ts-ignore
                console.log(asset.responseObject);

                // @ts-ignore
                this.assetsDataSource = new MatTableDataSource(asset.responseObject);
                this.assetsDataSource.paginator = this.assetsPaginator;

                this.returnedAssets = asset.responseObject.length
            },

        )

    }
    confirm(element) {
        this.Form.setValue({
            receivedBy: this.TokenData.id,
            dateReceived: this.today,
            received: true,
            id: element.id
        });
        this.confirmDialogService.openConfirmDialog('You have received the asset')
            .afterClosed().subscribe(res => {
            if (res) { // If a user selects yes then we get true, and we proceed with deleting
                this.returnService.confirmReturn(this.Form.value).subscribe(
                    resp => {
                        console.log(resp);

                        this.snackbar.open('  Done!', '', {
                            duration: 3500, // 3 Seconds
                            verticalPosition: 'top',
                            panelClass: ['success-snack']

                        });
                    },
                    error => {
                        this.snackbar.open('  Something went wrong!', '', {
                                duration: 3500, // 3 Seconds
                                verticalPosition: 'top',
                                panelClass: ['warn-snack']})
                        console.log(error)
                    },
                    () => {
                     this.getReturnedAssets()
                    }
                );
            }
        });
    }

    getDecodedAccessToken(): any {
        try {
            return jwt_decode( localStorage.getItem('token'));
        } catch (Error) {
            return null;
        }
    }
    getAllAssignedAssets() {
        this.recordService.displayAllAssignedAssets().subscribe(
            asset => {
                // @ts-ignore
                console.log(asset.responseObject);
                // @ts-ignore
                this.assignedAssets = asset.responseObject.length
            },

        )

    }
}
