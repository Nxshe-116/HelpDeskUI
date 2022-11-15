import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {RequestsService} from '../services/requests.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmDialogService} from '../services/confirm-dialog.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

import {MatDialog} from '@angular/material/dialog';
import {AssignAssetComponent} from '../user/assign-asset/assign-asset.component';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, AfterViewInit {
  requestColumns: string[] = ['request-id', 'request-name' , 'request-message', 'request-date', 'request-type', 'approve', 'deny']
    requests: string[] = ['request-id', 'request-name' , 'request-message', 'request-date', 'request-type']
  requestsDataSource = new MatTableDataSource<any[]>()
    acceptedRequestsDataSource = new MatTableDataSource<any[]>()
    rejectedRequestsDataSource = new MatTableDataSource<any[]>()
    requestForm: FormGroup
    TokenData: any
    today = new Date();

    @ViewChild('paginator', {static: true}) paginator!: MatPaginator;

    @ViewChild('acceptedPaginator', {static: true}) acceptedPaginator!: MatPaginator;

    @ViewChild('declinedPaginator', {static: true}) declinedPaginator!: MatPaginator;
    ngAfterViewInit() {
        this.requestsDataSource.paginator = this.paginator;
        this.acceptedRequestsDataSource.paginator = this.acceptedPaginator;
        this.rejectedRequestsDataSource.paginator = this.declinedPaginator;
        this.paginator.page.subscribe(
            (event) => console.log(event)
        );
    }
  constructor(private  requestService: RequestsService,
              private confirmDialogService: ConfirmDialogService,
           private snackbar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
      this.requestForm = new FormGroup (
          {
              status: new FormControl(null, Validators.required),
              approvedBy: new FormControl(null, Validators.required),
              approvedOn: new FormControl(),
              id: new FormControl(null, Validators.required),
          })
    this.getRequests()
      this.getAcceptedRequests()
      this.getDeniedRequests()
    this.TokenData = this.getDecodedAccessToken()
  }
  getRequests() {
    this.requestService.displayRequests().subscribe(
        resp => {

          // @ts-ignore
            console.log('These requests' + resp);
          // @ts-ignore
          console.log(resp.responseObject);
          // @ts-ignore
          this.requestsDataSource = new MatTableDataSource(resp.responseObject);
            this.requestsDataSource.paginator = this.paginator;
        },

    )

  }
    getAcceptedRequests() {
        this.requestService.displayApprovedRequests().subscribe(
            resp => {

                // @ts-ignore
                console.log(resp.responseObject);
                // @ts-ignore
                this.acceptedRequestsDataSource = new MatTableDataSource(resp.responseObject);
                this.acceptedRequestsDataSource.paginator = this.acceptedPaginator;
            },

        )

    }
    getDeniedRequests() {
        this.requestService.displayDeniedRequests().subscribe(
            resp => {

                // @ts-ignore
                console.log('These requests' + resp);
                // @ts-ignore
                console.log(resp.responseObject);
                // @ts-ignore
                this.rejectedRequestsDataSource = new MatTableDataSource(resp.responseObject);
                this.rejectedRequestsDataSource.paginator = this.declinedPaginator;
            },

        )

    }
    confirmRequest(element: any) {
        this.requestForm.setValue({
           approvedBy: this.TokenData.id,
            approvedOn: this.today,
            status: 1,
            id: element.id
        });
     console.log(this.requestForm.value)
        this.confirmDialogService.openConfirmDialog('Approve Asset Request for ' + element.requestedBy)
            .afterClosed().subscribe(res => {
            if (res) { // If a user selects yes then we get true, and we proceed with deleting
                this.requestService.confirmRequest(this.requestForm.value).subscribe(
                    resp => {
                        console.log(resp);

                        this.snackbar.open('  Approved!', '', {
                            duration: 3500, // 3 Seconds
                            verticalPosition: 'top',
                            panelClass: ['success-snack']

                        });
                    },
                    error => {
                        console.log(error)
                    },
                    () => {
                        // UPDATE TABLE
                        this.getRequests();

                        const userId = this.getIdByUsername();

                        const dialogRef = this.dialog.open(AssignAssetComponent,
                            {
                                width: '600px',
                                height: '500px',
                                disableClose: true,
                                data: { title: element.name,
                                    message: element.name,
                                    body: element.requestedBy,
                                    id: userId
                            }});
                        dialogRef.afterClosed().subscribe(result => {
                            console.log(result)
                            },
                            () => {},

                            () => {
                            }
                        )
                    }
                );
            }
        });
    }
    denyRequest(element: any) {
        this.requestForm.setValue({
            approvedBy: this.TokenData.id,
            approvedOn: this.today,
            status: 2,
            id: element.id
        });
        console.log(this.requestForm.value)
        this.confirmDialogService.openConfirmDialog('Are you sure you want to disapprove? ')
            .afterClosed().subscribe(res => {
            if (res) { // If a user selects yes then we get true, and we proceed with deleting
                this.requestService.confirmRequest(this.requestForm.value).subscribe(
                    resp => {
                        console.log(resp);

                        this.snackbar.open('  Done!', '', {
                            duration: 3500, // 3 Seconds
                            verticalPosition: 'top',
                            panelClass: ['info-snack']

                        });
                    },
                    error => {
                        console.log(error)
                    },
                    () => {
                        // UPDATE TABLE
                        this.getRequests();


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
    private getIdByUsername(): any {

    }
}
