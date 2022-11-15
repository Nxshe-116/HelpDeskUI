import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {


  constructor(private http: HttpClient) {
  }

  requestAsset(type) {
    return this.http.post<Request[]>(environment.apiUrl + 'AssetRequest/RequestForAsset', type);
  }

  displayRequests() {
    return this.http.get<any[]>(environment.apiUrl + 'AssetRequest/DisplayAssetRequests');
  }

  displayApprovedRequests() {
    return this.http.get<any[]>(environment.apiUrl + 'AssetRequest/DisplayAcceptedAssetRequests');
  }
  displayDeniedRequests() {
    return this.http.get<any[]>(environment.apiUrl + 'AssetRequest/DisplayDeniedAssetRequests');
  }

  confirmRequest(type) {
    return this.http.post<any[]>(environment.apiUrl + 'AssetRequest/ApproveRequest', type);
}

displayRequestById(id): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + 'AssetRequest/DisplayAssetRequestsById?id=' + id)
}

  deleteRequest(id): Observable<any[]> {
    return this.http.delete<any[]>(environment.apiUrl + 'AssetRequest/DeleteAssetRequest?id=' + id)
  }
}
