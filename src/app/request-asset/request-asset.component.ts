import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-request-asset',
  templateUrl: './request-asset.component.html',
  styleUrls: ['./request-asset.component.css']
})
export class RequestAssetComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<RequestAssetComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}



