import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingServiceService {

  constructor(private router: Router) { }


  public routeToLogin(){
    this.router.navigate(['login']);
  }

  public routeToHome(){
    this.router.navigate(['home']);
  }

  public routeToRewards(){
    this.router.navigate(['reward']);
  }

  public routeToProfile(){
    this.router.navigate(['profile']);
  }

  public routeToWallet(){
    this.router.navigate(['wallet']);
  }

  public routeToTransaction(){
    this.router.navigate(['transaction']);
  }

  public rotueToPayment(){
    this.router.navigate(['payment']);
  }

}
