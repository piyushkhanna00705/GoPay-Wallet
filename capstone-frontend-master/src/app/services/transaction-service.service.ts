import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  postUrl = "http://localhost:9004/api/transaction";
  getUrl = "http://localhost:9004/api/transaction/customer/";

  constructor(private httpClient:HttpClient) { }

  public addTransaction(data:any):Observable<any>{
    return this.httpClient.post(this.postUrl,data);
  }

  public getTransactions(): Observable<any>{
    let cust = localStorage.getItem("tokenId");
    return this.httpClient.get(this.getUrl+cust);
  }

}
