import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserComponent } from '../../user/user.component';
import { AssetsComponent } from '../../assets/assets.component';
import { SuppliersComponent } from '../../suppliers/suppliers.component';

import { RequestsComponent } from '../../requests/requests.component';
import {AssetTypesComponent} from '../../asset-types/asset-types.component';
import {LogInComponent} from '../../log-in/log-in.component';
import {AuthGuard} from '../../shared/auth.guard';
import {ForbiddenComponent} from '../../forbiden/forbidden.component';
import {PendingRequestsComponent} from '../../pending-requests/pending-requests.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'user',   component: UserComponent, canActivate: [AuthGuard]  },
    { path: 'my-requests',   component: PendingRequestsComponent, canActivate: [AuthGuard] },
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin', 'Solutions', 'SuperAdmin'] }},
    { path: 'asset-types',   component: AssetTypesComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin', 'Solutions', 'SuperAdmin'] } },
    // tslint:disable-next-line:max-line-length
    { path: 'assets',     component: AssetsComponent, canActivate: [AuthGuard],  data: {permittedRoles: ['Admin', 'Solutions', 'SuperAdmin'] }},
    { path: 'suppliers',     component: SuppliersComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin', 'Solutions', 'SuperAdmin'] }},
    // tslint:disable-next-line:max-line-length
    {path: 'helpdesk-requests', component: RequestsComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin', 'Solutions', 'Super Admin'] }},
    {path: 'log-in', component: LogInComponent,   },
    {path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard]}


];
