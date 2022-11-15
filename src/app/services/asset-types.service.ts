import { Injectable } from '@angular/core';
import {AssetTypes} from '../../../models/asset-types';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetTypesService {

  constructor(private http: HttpClient) { }


  getAssetTypes(): Observable<AssetTypes[]> {
      const httpOptions = {
          headers: new HttpHeaders(
              {
                  Authorization: 'Bearer' + localStorage.getItem('token')
              }
          )
      };
  return this.http.get<AssetTypes[]> (environment.apiUrl + 'AssetType', httpOptions);
}

 addAssetTypes(type: AssetTypes) {
     const httpOptions = {
         headers: new HttpHeaders(
             {
                 Authorization: 'Bearer' + localStorage.getItem('token')
             }
         )
     };
  return this.http.post(environment.apiUrl + 'AssetType/AddAssetType', type, httpOptions);
}

    editAssetType(type: AssetTypes) {
        const httpOptions = {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer' + localStorage.getItem('token')
                }
            )
        };
        return this.http.put<any>(environment.apiUrl + 'AssetType/UpdateAssetType', type, httpOptions);
    }

    deleteAssetType(id) {
        const httpOptions = {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer' + localStorage.getItem('token')
                }
            )
        };
        return this.http.delete<number>(environment.apiUrl + 'AssetType/DeleteAssetType?id=' + id, httpOptions);
    }
}
