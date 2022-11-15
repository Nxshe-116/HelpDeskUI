import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { AssetTypesComponent } from './asset-types/asset-types.component';
import {AssetTypesService} from './services/asset-types.service';
import { RequestAssetComponent } from './user/request-asset/request-asset.component';

import { EditAssetTypeComponent } from './asset-types/edit-asset-type/edit-asset-type.component';

import { AddAssetTypeComponent } from './asset-types/add-asset-type/add-asset-type.component';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { LogInComponent } from './log-in/log-in.component';
import {AuthService} from './services/auth.service';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './suppliers/edit-supplier/edit-supplier.component';

import {SuppliersService} from './services/suppliers.service';
import { AddAssetComponent } from './assets/add-asset/add-asset.component';

import { ForbiddenComponent } from './forbiden/forbidden.component';
import { ConfirmComponent } from './user/confirm/confirm.component';

import { AssignAssetComponent } from './user/assign-asset/assign-asset.component';

import { PendingRequestsComponent } from './pending-requests/pending-requests.component';

import {TokenInterceptorService} from './services/token-interceptor.service';
import { AssignedAssetsComponent } from './assigned-assets/assigned-assets.component';
import { ReturnAssetComponent } from './dashboard/return-asset/return-asset.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatDividerModule,
        MatExpansionModule,
        MatListModule,
        MatRadioModule,
        MatAutocompleteModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AssetTypesComponent,
    RequestAssetComponent,
    EditAssetTypeComponent,
    AddAssetTypeComponent,
    ConfirmDialogComponent,
    LogInComponent,
    AddSupplierComponent,
    EditSupplierComponent,
    AddAssetComponent,
    ForbiddenComponent,
    ConfirmComponent,
    AssignAssetComponent,
    PendingRequestsComponent,
    AssignedAssetsComponent,
    ReturnAssetComponent,


  ],
  providers: [
      AssetTypesService,
      AuthService,
      SuppliersService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true

      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
