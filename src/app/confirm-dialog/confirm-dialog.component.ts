import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  messageData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {
    this.messageData = this.data;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
