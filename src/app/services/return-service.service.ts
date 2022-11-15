import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReturnServiceService {

  constructor(private http: HttpClient) { }

  returnAsset(type) {

    return this.http.post<any[]>(environment.apiUrl + 'ReturnedAsset/ReturnAsset', type, );
  }
  confirmReturn(type) {
     return this.http.post<any[]>(environment.apiUrl + 'ReturnedAsset/Confirm', type);
  }
  displayReturnId(id) {
    return this.http.get<any[]>(environment.apiUrl + 'AssetRecord/DisplayAssignedId?id=' + id);
  }
  getReturnedAssets() {
    return this.http.get<any>(environment.apiUrl + 'ReturnedAsset/DisplayReturnedAssets');
  }
}
