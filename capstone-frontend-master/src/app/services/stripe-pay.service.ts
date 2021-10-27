import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl="http://localhost:8095/create-charge";


@Injectable({
  providedIn: 'root'
})
export class StripePayService {

  constructor(private http:HttpClient) { 
  }

  sendPayment(data:any):Observable<any>{
    console.log(data);
    return this.http.post(baseUrl,data);
  }


}
