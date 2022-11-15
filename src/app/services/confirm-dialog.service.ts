import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container', // This is used as the key when customizing css
      disableClose: true, // this disables closing by clicking outside the dialog window or pressing escape
      position: { top: '40px' },
      data : {
        message : msg
      }
    });
  }
}
