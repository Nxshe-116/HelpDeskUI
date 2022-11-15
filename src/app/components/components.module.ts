import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
      MatExpansionModule,
      MatRadioModule,
      MatPaginatorModule,
      MatTabsModule,
      MatListModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
