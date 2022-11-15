import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Asset} from '../../../models/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) {
  }

  getAssets(): Observable<Asset[]> {

    return this.http.get<Asset[]>(environment.apiUrl + 'Asset');
  }

  addAsset(type: Asset) {

    return this.http.post(environment.apiUrl + 'Asset/AddAsset', type, );
  }

  editAssetType(type: Asset) {

    return this.http.put<any>(environment.apiUrl + 'Asset/UpdateAsset', type, );
  }

  deleteAssetType(id) {

    return this.http.delete<number>(environment.apiUrl + 'Asset/DeleteAsset?id=' + id, );
  }
}

