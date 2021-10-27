import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyConversionService } from '../services/currency-conversion.service';
import { EndpointServiceService } from '../services/endpoint-service.service';
import { ProfileService } from '../services/profile.service';
import { TransactionServiceService } from '../services/transaction-service.service';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ThrowStmt } from '@angular/compiler';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  showEndpointPayment = true;
  showWalletPayment = false;
  showEndpointDetails!:boolean;
  endpointDetails!:any;
  endpointId!:number;
  customerId!:any;
  customerDetails!:any;
  showCustomerDetails!:boolean;

  payCustId!:number;
  payCustDetails!:any;

  isLoading = false;
  conversionRate!:string;
  strikeCheckout:any = null;

  constructor(private endpointService:EndpointServiceService, private currencyConversionService:CurrencyConversionService, private profileService:ProfileService, private transactionServiceService:TransactionServiceService, private loginServiceService:LoginServiceService) { 
    this.showEndpointDetails = false;
    this.showCustomerDetails = false;
    this.customerId = localStorage.getItem('tokenId');
    this.profileService.getProfile().subscribe(data=>{
      this.customerDetails = data;
    })
  }

  ngOnInit() {
    this.hideEndpointDetails();
    this.endpointDetails = {
      country: "",
      currency: "",
      endpointId: 0,
      endpointImageUrl: "",
      endpointName: "",
      totalAmount: 0
    }
    this.payCustDetails = {
      customerId:0,
      name:"",
      DOB:"",
      phoneNo:"",
      email:"",
      password:"",
      address:"",
      rewardPoints:0,
      walletAmount:0,
      walletLimit:0
    }
  }
  
  paymentForm = new FormGroup({
    endpointId: new FormControl(null, [Validators.required]),
    endpointName: new FormControl,
    endpointCountry:new FormControl,
    endpointCurrency: new FormControl,
    amount: new FormControl(null,[Validators.required]),
    conversion: new FormControl
  });


  paymentCustomerForm = new FormGroup({
    payCustId: new FormControl(null, [Validators.required]),
    payCustName: new FormControl,
    payCustEmail:new FormControl,
    payCustAmount: new FormControl(null,[Validators.required])
  });


  setradio(e:string):void{
    if(e==="Vendor"){
      this.showEndpointPayment = true;
      this.showWalletPayment = false;
    }
    else{
      this.showEndpointPayment = false;
      this.showWalletPayment = true;
    }
  }

  onEndpointEntered(){
    // this.isLoading = true;
    this.endpointId = this.paymentForm.get('endpointId')?.value;
    console.log("EndpointId "+this.endpointId);
    this.endpointService.getEndpointDetails(this.endpointId).subscribe(data=>{
      this.endpointDetails = data;
      console.log(this.endpointDetails);
      if(this.endpointDetails != null){
        

        this.currencyConversionService.convert(this.endpointDetails.currency, "INR", 1).subscribe(data=>{
          this.conversionRate = "1 "+  this.endpointDetails.currency + " = " + data + " INR";
          this.displayEndpointDetails();
          // this.isLoading = false;
        })
      }
      else{
        this.endpointDetails = {
          country: "",
          currency: "",
          endpointId: 0,
          endpointImageUrl: "",
          endpointName: "",
          totalAmount: 0
        };
        this.invalidEndpointNotification();
        
        this.hideEndpointDetails();
        
      }
    });
  }

  displayEndpointDetails(){

    this.showEndpointDetails=true;
    this.paymentForm.get('endpointName')?.setValue(this.endpointDetails.endpointName);
    this.paymentForm.get('endpointName')?.disable();
    this.paymentForm.get('endpointCountry')?.setValue(this.endpointDetails.country);
    this.paymentForm.get('endpointCountry')?.disable();
    this.paymentForm.get('endpointCurrency')?.setValue(this.endpointDetails.currency);
    this.paymentForm.get('endpointCurrency')?.disable();
  
    this.paymentForm.get('conversion')?.setValue(this.conversionRate);
    this.paymentForm.get('conversion')?.disable();

    this.paymentForm.get('amount')?.setValue("");
  }

  hideEndpointDetails(){
    this.showEndpointDetails = false;
    this.paymentForm.get('endpointId')?.setValue("");
    this.paymentForm.get('endpointName')?.setValue("");
    this.paymentForm.get('endpointName')?.disable();
    this.paymentForm.get('endpointCountry')?.setValue("");
    this.paymentForm.get('endpointCountry')?.disable();
    this.paymentForm.get('endpointCurrency')?.setValue("");
    this.paymentForm.get('endpointCurrency')?.disable();
    this.paymentForm.get('amount')?.setValue("");
  }

  getDateTime():string{
    let date_ob = new Date();

    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = ("0"+date_ob.getHours()).slice(-2);

    // current minutes
    let minutes = ("0"+date_ob.getMinutes()).slice(-2);

    // current seconds
    let seconds = ("0"+date_ob.getSeconds()).slice(-2);

    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  }

  makePayment(){

    this.isLoading = true;

    let amount = this.paymentForm.get('amount')?.value;
    console.log("Amount in "+ this.endpointDetails.currency + " = " + amount);
    let amountInINR: number;
    this.currencyConversionService.convert(this.endpointDetails.currency,"INR",amount).subscribe(data=>{
      amountInINR = data;
      console.log("Amount in INR = "+ amountInINR);
      this.profileService.getProfile().subscribe(data=>{
        this.customerDetails = data;
        let walletAmount = this.customerDetails.walletAmount;
        
        console.log("Wallet Amount of Customer = " + walletAmount);
        
        if(amountInINR>walletAmount){
          // alert("Insufficient Funds");
          this.isLoading = false;
          this.insufficientBalanceNotification();
          this.paymentForm.get('amount')?.setValue("");
          // this.hideEndpointDetails();
        }
        else{
          let updatedCustDetails = this.customerDetails;
          updatedCustDetails.walletAmount -= amountInINR;
          updatedCustDetails.rewardPoints += 0.05*amountInINR;
          this.profileService.updateProfile(updatedCustDetails).subscribe(
            data=>{console.log(data);
            let updatedEndpointDetails = this.endpointDetails;
            updatedEndpointDetails.totalAmount += amount;
            this.endpointService.updateEndpoint(this.endpointId,updatedEndpointDetails).subscribe(data=>{
                console.log(data);

                let trans = {
                  "customerId": this.customerId,
                  "endpointId": this.endpointId,
                  "transactionAmount": amountInINR,
                  "transactionDateTime": this.getDateTime(),
                  "endpointName": this.endpointDetails.endpointName,
                  "transactionType": "debit",
                  "endpointImageUrl": this.endpointDetails.endpointImageUrl
                }
                this.transactionServiceService.addTransaction(trans).subscribe(data=>{
                  console.log(data);
                  // alert("Payment Successful");
                  this.isLoading = false;
                  this.successNotification(amountInINR);
                  this.hideEndpointDetails();
                });
              }
            );
            
            }
          );
          
        }

      })
    });
    
  }


  successNotification(amountInINR:any){

    Swal.fire('Success', '₹'+amountInINR+' Tranferred Successfully!', 'success');
    
    // Swal.fire(
    //   "Success!",
    //   '₹'+amountInINR+' Tranferred Successfully!',
    //   "success"
    //   ).then(() => {
    //     this.hideEndpointDetails();
    //   });
  }

  insufficientBalanceNotification(){
    Swal.fire('Failure', 'Insufficient Balance in your Wallet!', 'error')
  }

  invalidEndpointNotification(){
    Swal.fire('Failure', 'Invalid Endpoint ID.', 'error')
  }

  invalidCustNotification(){
    Swal.fire('Failure', 'Invalid Customer ID.', 'error')
  }

  sameCustNotification(){
    Swal.fire('Failure', 'You cannout send money to your own wallet.', 'error')
  }


  onCustIdEntered(){
    this.payCustId = this.paymentCustomerForm.get('payCustId')?.value;
    console.log("Customer ID "+this.payCustId);
    if(this.payCustId == this.customerId){
      this.sameCustNotification();
      this.hidePayCustDetails();
    }
    else{
      this.loginServiceService.validateUserByID(this.payCustId).subscribe(data=>{
        this.payCustDetails = data;
        if(this.payCustDetails!=null){
          this.displayPayCustDetails();
        }
        else{
          this.payCustDetails = {
            customerId:0,
            name:"",
            DOB:"",
            phoneNo:"",
            email:"",
            password:"",
            address:"",
            rewardPoints:0,
            walletAmount:0,
            walletLimit:0
          }
          this.invalidCustNotification();
          this.hidePayCustDetails();

        }
      })
    }
  }


  makeCustomerPayment(){
    // this.isLoading = true;

    let amount = this.paymentCustomerForm.get('payCustAmount')?.value;
    console.log("Amount = " + amount);
    this.profileService.getProfile().subscribe(data=>{
      this.customerDetails = data;
      let walletAmount = this.customerDetails.walletAmount;
      console.log("Wallet Amount of Customer = " + walletAmount);
      if(walletAmount<amount){
        this.isLoading = false;
        this.insufficientBalanceNotification();
        this.paymentCustomerForm.get('payCustAmount')?.setValue("");
      }
      else{
        let updatedCustDetails = this.customerDetails;
          updatedCustDetails.walletAmount -= amount;
          updatedCustDetails.rewardPoints += 0.05*amount;
          this.profileService.updateProfile(updatedCustDetails).subscribe(
            data=>{
              console.log(data);
              
              let updatedPayCustDetails = this.payCustDetails;
              updatedPayCustDetails.walletAmount+= amount;

              this.profileService.updateProfile(updatedPayCustDetails).subscribe(data=>{
                console.log(data);
                let trans = {
                  "customerId": this.customerId,
                  "endpointId": this.payCustId,
                  "transactionAmount": amount,
                  "transactionDateTime": this.getDateTime(),
                  "endpointName": this.payCustDetails.name,
                  "transactionType": "debit",
                  "endpointImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSMb054Y17AiNbJnY-DKZXrREK1d1JAyg8KA&usqp=CAU"
                }


                let trans2 = {
                  "customerId": this.payCustId,
                  "endpointId": this.customerId,
                  "transactionAmount": amount,
                  "transactionDateTime": this.getDateTime(),
                  "endpointName": this.customerDetails.name,
                  "transactionType": "credit",
                  "endpointImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXtX_MJZai1BUx5bmCyXDA9LR53aBk-LWxOA&usqp=CAU"
                }

                this.transactionServiceService.addTransaction(trans).subscribe(data=>{
                  console.log(data);

                  this.transactionServiceService.addTransaction(trans2).subscribe(data=>{
                    console.log(data);
                    this.isLoading = false;
                    this.successNotification(amount);
                    this.hidePayCustDetails();
                  })
                })
                // Add transaction details into transaction Page.
              })
          })
      }
    })
  }

  displayPayCustDetails(){

    this.showCustomerDetails = true;
    this.paymentCustomerForm.get('payCustName')?.setValue(this.payCustDetails.name);
    this.paymentCustomerForm.get('payCustName')?.disable();
    
    this.paymentCustomerForm.get('payCustEmail')?.setValue(this.payCustDetails.email);
    this.paymentCustomerForm.get('payCustEmail')?.disable();

    this.paymentCustomerForm.get('payCustAmount')?.setValue("");
  }

  hidePayCustDetails(){

    this.showCustomerDetails = false;
    this.paymentCustomerForm.get('payCustName')?.setValue(this.payCustDetails.name);
    this.paymentCustomerForm.get('payCustName')?.disable();
    
    this.paymentCustomerForm.get('payCustEmail')?.setValue(this.payCustDetails.email);
    this.paymentCustomerForm.get('payCustEmail')?.disable();

    this.paymentCustomerForm.get('payCustAmount')?.setValue("");
    
  }


}
