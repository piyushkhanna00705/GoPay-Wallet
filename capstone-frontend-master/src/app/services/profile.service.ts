import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = "http://localhost:9006/api/customer/";

  constructor(private http: HttpClient) { }

  public getProfile() : Observable<any>{
    const id = localStorage.getItem("tokenId");
    return this.http.get(this.baseUrl+id);
  }

  public updateProfile(data: any): Observable<any>{
    return this.http.put(this.baseUrl, data);
  }

}
