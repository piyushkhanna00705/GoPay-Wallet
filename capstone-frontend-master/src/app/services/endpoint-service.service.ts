import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EndpointServiceService {

  baseUrl = "http://localhost:9002/api/endpoint/"

  constructor(private httpClient:HttpClient) { }

  public getEndpointDetails(endpointId:number):Observable<any>{
    return this.httpClient.get(this.baseUrl+endpointId);
  }

  public updateEndpoint(endpointId:number,data: any): Observable<any>{
    return this.httpClient.put(this.baseUrl, data);
  }
  
}
