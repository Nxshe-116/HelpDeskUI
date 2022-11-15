import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserComponent } from '../../user/user.component';
import { AssetsComponent } from '../../assets/assets.component';
import {SuppliersComponent} from '../../suppliers/suppliers.component';
import { IconsComponent } from '../../icons/icons.component';
import { RequestsComponent } from '../../requests/requests.component';
import { RequestAssetComponent } from '../../request-asset/request-asset.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {PendingRequestsComponent} from '../../pending-requests/pending-requests.component';
import {ConfirmComponent} from '../../user/confirm/confirm.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatTabsModule,
    ],
  declarations: [
    DashboardComponent,
    UserComponent,

    AssetsComponent,
    SuppliersComponent,
    IconsComponent,
    RequestsComponent,
    RequestAssetComponent,
  ]
})

export class AdminLayoutModule {}
