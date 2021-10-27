import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RewardServiceService {

  baseUrl : string = "http://localhost:9008/api/reward";

  constructor(private http: HttpClient) { }

  // Function to return a single reward by reward id. 
  public getRewardById(id:any) : Observable<any>{
    return this.http.get(this.baseUrl+id);
  }

  // Function to return all the rewards as a list. 
  public getAllRewards() : Observable<any>{
    return this.http.get(this.baseUrl);
  }


}
