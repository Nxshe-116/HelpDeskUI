import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  recordAsset(type) {
    const httpOptions = {
      headers: new HttpHeaders(
          {
            Authorization: 'Bearer' + localStorage.getItem('token')
          }
      )
    };
    return this.http.post<any[]>(environment.apiUrl + 'AssetRecord/RecordAsset', type, httpOptions);
  }
  confirmAsset(type) {


    return this.http.post<any[]>(environment.apiUrl + 'AssetRecord/Confirm', type);
  }
  displayAssignedAsset(id) {
    return this.http.get<any[]>(environment.apiUrl + 'AssetRecord/DisplayAssignedAssetById?id=' + id);
  }
  displayAssignedAssets(id) {
    return this.http.get<any[]>(environment.apiUrl + 'AssetRecord/DisplayAssignedAssetsById?id=' + id);
  }


  displayAssignmentID(id) {
    return this.http.get<any[]>(environment.apiUrl + 'AssetRecord/DisplayAssignedId?id=' + id);
  }

  displayAllAssignedAssets() {
    return this.http.get<any[]>(environment.apiUrl + 'AssetRecord/DisplayAllAcquiredAssets');
  }

  // AssetRecord/DisplayAllAcquiredAssets
}
