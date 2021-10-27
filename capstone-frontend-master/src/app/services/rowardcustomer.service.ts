import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rewardCustomer } from '../rewardCustomer';

@Injectable({
  providedIn: 'root'
})

export class RowardcustomerService {

  baseUrl : string = "http://localhost:9010/api/rewardcustomer";

  constructor(private http: HttpClient) { }

  // Function to make a GET request to return a single rewardcustomer by reward id. 
  public getRewardCustomerById(id:any) : Observable<any>{
    return this.http.get(this.baseUrl+id);
  }

  // Function to make a GET request to return all the rewardcustomers as a list. 
  public getAllRewardCustomers() : Observable<any>{
    return this.http.get(this.baseUrl);
  }

  // Function to make a POST request to add an element.
  public addRedemption(redemption : rewardCustomer) : Observable<rewardCustomer>{
    return this.http.post<rewardCustomer>(this.baseUrl, redemption);
  }

  // Function to make a GET request based on customer ID given. 
  public getByCustomerId(custId : any) : Observable<any> {
    return this.http.get(this.baseUrl + '/customerId/' + custId);
  }


}
