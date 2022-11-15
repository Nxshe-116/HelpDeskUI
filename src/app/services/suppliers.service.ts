import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AssetTypes} from '../../../models/asset-types';
import {environment} from '../../environments/environment';
import {Supplier} from '../../../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient) { }


  getSuppliers(): Observable<Supplier[]> {
    const httpOptions = {
      headers: new HttpHeaders(
          {
            Authorization: 'Bearer' + localStorage.getItem('token')
          }
      )
    };
    return this.http.get<Supplier[]> (environment.apiUrl + 'Supplier', httpOptions);
  }

  addSupplier(type: Supplier) {
    const httpOptions = {
      headers: new HttpHeaders(
          {
            Authorization: 'Bearer' + localStorage.getItem('token')
          }
      )
    };
    return this.http.post(environment.apiUrl + 'Supplier/AddSupplier', type, httpOptions);
  }

  editSupplierDetails(type: Supplier) {

    return this.http.put<any>(environment.apiUrl + 'Supplier/UpdateSupplierDetails', type);
  }

  deleteSupplier (id) {
    const httpOptions = {
      headers: new HttpHeaders(
          {
            Authorization: 'Bearer' + localStorage.getItem('token')
          }
      )
    };
    return this.http.delete<number>(environment.apiUrl + 'Supplier/DeleteSupplier?id=' + id, httpOptions );
  }
}
