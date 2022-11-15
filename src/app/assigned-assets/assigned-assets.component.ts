import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Asset} from '../../../models/asset';
import {MatPaginator} from '@angular/material/paginator';
import {AssetService} from '../services/asset.service';
import {RecordService} from '../services/record.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {response} from 'express';

@Component({
  selector: 'app-assigned-assets',
  templateUrl: './assigned-assets.component.html',
  styleUrls: ['./assigned-assets.component.css']
})
export class AssignedAssetsComponent implements OnInit, AfterViewInit {

  assetColumns: string[] = [
    'asset-name' ,
    'asset-make',
    'asset-model',
    'asset-serial-number' ,
   ]

  decodedTokenData: any;
  user: any
  assetsDataSource = new MatTableDataSource<any>();
  @ViewChild('assetPaginator', {static: true}) assetPaginator!: MatPaginator;

  ngAfterViewInit() {
    this.assetsDataSource.paginator = this.assetPaginator;
  }
  constructor(
              private assetService: AssetService,
              private  service: RecordService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DashboardComponent>
            ) { }

  ngOnInit(): void {
      this.getAssets()

  }


  getAssets() {
    this.service.displayAssignedAssets(this.data.teloneUserId).subscribe(
        asset => {
            // @ts-ignore
          console.log(asset.responseObject);
          // @ts-ignore
          this.assetsDataSource = new MatTableDataSource(asset.responseObject);
          this.assetsDataSource.paginator = this.assetPaginator;

        },
    )
  }



}
