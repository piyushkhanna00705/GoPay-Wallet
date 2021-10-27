import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutingServiceService } from './routing-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  baseUrl = "http://localhost:9006/api/customer/email/";
  regUrl = "http://localhost:9006/api/customer/";

  constructor(private http: HttpClient, private router: RoutingServiceService) { }

  public validateUser(email:String) : Observable<any>{
    return this.http.get(this.baseUrl+email);
  }

  public validateUserByID(id:any) : Observable<any>{
    return this.http.get(this.regUrl+id);
  }
  
  public isAuthenticated() : boolean{
    if(localStorage.getItem('tokenId')!=null)
      return true;
    return false;
  }

  public logout(){
    localStorage.removeItem("tokenId");
    this.router.routeToLogin();
  }

  public registerUser(data: any): Observable<any>{
    return this.http.post(this.regUrl, data);
  }


}
