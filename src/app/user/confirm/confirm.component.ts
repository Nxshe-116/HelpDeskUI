import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserComponent} from '../user.component';
import {RecordService} from '../../services/record.service';
import jwt_decode from 'jwt-decode';
import {FormControl, FormGroup, Validators} from '@angular/forms';

// import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
 info: any;
    assignmentID: any
    today = new Date();
    Form: FormGroup
  TokenData: any
  constructor(  @Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<UserComponent>,
                private recordService: RecordService) { }

  ngOnInit(): void {
    this.TokenData = this.getDecodedAccessToken()
      this.displayAssignedAsset();
      this.Form = new FormGroup(
          {
              id:  new FormControl(null, Validators.required),
              received: new FormControl(null, Validators.required),
              dateReceived: new FormControl(null, Validators.required),

          }
      )
this.getId()
  }


  closeDialog() {
    this.dialogRef.close();
  }

  confirm() {

     this.Form.patchValue({
         id: this.assignmentID,
          received: true,
         dateReceived: this.today,
     })


      this.recordService.confirmAsset(this.Form.value).subscribe(
          resp => {
              console.log(resp)
          },
          () => {},

          () =>  this.closeDialog()
    )
  }

  displayAssignedAsset() {
      this.recordService.displayAssignedAsset(this.TokenData.id).subscribe(
       resp => {
           // @ts-ignore
           console.log(resp.responseObject)
           // @ts-ignore
           this.info = resp.responseObject
           // @ts-ignore
           console.log(this.info)
       },
       (error) => {
           console.log(error)
       }
      )

  }

  getId() {
        this.recordService.displayAssignmentID(this.TokenData.id).subscribe(
            response => {
                // @ts-ignore
                this.assignmentID = response.responseObject

                // @ts-ignore
                console.log(response.responseObject)
            }
        )
  }
  getDecodedAccessToken(): any {
    try {
      return jwt_decode( localStorage.getItem('token'));
    } catch (Error) {
      return null;
    }
  }
}
