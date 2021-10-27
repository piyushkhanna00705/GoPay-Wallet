import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as shajs from 'sha.js';
import { LoginServiceService } from '../services/login-service.service';
import { RoutingServiceService } from '../services/routing-service.service';
import { whitespaceValidator } from './whitespaceValidator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private loginservice: LoginServiceService, private router: RoutingServiceService) { }

  showloginpage = true;
  emailExists = false;
  loginerror = false;
  validDate?:any;
  invalidCredentials = false;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  registrationForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'), whitespaceValidator.cannotContainSpace]),
    dob: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
    this.selectValidDate();
  }

  // To maintain the user age to 18
  selectValidDate(){
    const date = new Date();
    let year = date.getFullYear() - 18;
    let month = date.getMonth().toString();
    let day = date.getDate().toString();
    if(parseInt(month) < 10){
      month = '0'+month;
    }
    if(parseInt(day) < 10){
      day = '0'+day; 
    }
    this.validDate = year+'-'+month+'-'+day;
  }

  registerUser(){
    
    let hash = shajs('sha256').update(this.registrationForm.get('password')?.value).digest('hex');
    let profileData = {
      name: this.registrationForm.get('name')?.value,
      email: this.registrationForm.get('email')?.value,
      dob: this.registrationForm.get('dob')?.value,
      password: hash,
      address: "",
      phoneNo: "",
      walletAmount: 0,
      walletLimit: 5000,
      rewardPoints: 0
    }
    this.loginservice.validateUser(profileData.email).subscribe(
      result=>{
        console.log(result);
        this.emailExists = true;
        this.registrationForm.get('password')?.reset();
        if(result==null){
          this.loginservice.registerUser(profileData).subscribe(
            data=>{
              console.log(data);
              this.emailExists = false;
              this.registrationForm.reset();
              this.showloginpage = true;
          });
        }
      },error => {console.log(error);}
    );
    console.log(hash);
    
  }

  loginUser(){
    let hash = shajs('sha256').update(this.loginForm.get('password')?.value).digest('hex');
    //validate user
    this.loginservice.validateUser(this.loginForm.get('email')?.value).subscribe(
      data=>{
        if(data.password == hash ){
          this.invalidCredentials = false;
          localStorage.setItem("tokenId", data.customerId);
          this.router.routeToHome();
        }
        else
          this.invalidCredentials = true;
      }, error=>{console.log(error);}
    );
    this.loginForm.reset();

    //if not validated
    // this.invalidCredentials = true;
  }

}