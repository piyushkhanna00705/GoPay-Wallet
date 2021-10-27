import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { StripePayService } from '../services/stripe-pay.service';
import { LoadingComponent } from './loading'
import { ProfileService } from '../services/profile.service';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DOCUMENT } from '@angular/common'; 

declare var Stripe: any; // : stripe.StripeStatic;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})


export class WalletComponent implements OnInit {


  isLoading = false;
  walletAmount?:number;

  load() : void {
    this.isLoading = true;
    setTimeout( () => this.isLoading = false, 2000 );
  }


  strikeCheckout:any = null;
  // @Input() amount: number;

  // @Input() description: string;

  // @ViewChild('cardElement') cardElement: ElementRef | any;

  // cardElement: any;

  @ViewChild('cardElement') cardElement: ElementRef | undefined;

  stripe: any; // : stripe.Stripe;
  card: any;
  cardErrors: any;
  loading = false;
  confirmation: any;
  customerDetails!:any;
  // paymentDetails: FormGroup;
  paymentDetails = new FormGroup({
  email: new FormControl(),
  amount: new FormControl(),
  });

  constructor(private stripeService:StripePayService, private fb: FormBuilder, private profileService:ProfileService) { 

    // this.cardElement=document.getElementById('card-element');
    this.profileService.getProfile().subscribe(data=>{
      this.customerDetails = data;
      this.walletAmount = data.walletAmount;
    })

  }

  ngOnInit(): void {
    // this.loadStripe();

  this.stripePaymentGateway();
  this.stripe = Stripe('pk_test_51JSc1jSJ09zwd8DycjG1rcVCXeiqCx3YXBXnhwpXIsH6LJ8K2tsj7QwkwLAmNPJ1XpITJjS6cFk7jyA4oJk3jvOI004FWXOFSD');
  const elements = this.stripe.elements();
  this.card = elements.create('card');
  this.card.mount('#card-element');
  // console.log(this.cardElement);
  // this.card.mount(this.cardElement.nativeElement);

  this.card.addEventListener('change', function (event:any) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
    displayError!.textContent = event.error.message;
    } 
    else{
      displayError!.textContent = '';
    }

  });

  this.paymentDetails = this.fb.group({
    email: ['', Validators.required],
    amount: ['', Validators.required],
  });

  // this.card.addEventListener('change', ({ error }) => {

  //     this.cardErrors = error && error.message;

  // });
  }

  get paymentDetailsFormControl() {

    return this.paymentDetails.controls;    
  }

  loadStripe() {
      if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v3/";
      window.document.body.appendChild(s);
      }
    }

    tinyAlert(){
      Swal.fire('Hey there!');
    }
    
    successNotification(amount:any){
      Swal.fire('Success', '₹'+amount/100+' added to Wallet!', 'success')
    }

    //handle card submission

handlePayments() {
    console.log(this.paymentDetails.value);
    var email=this.paymentDetails.get('email')!.value;
    var amount=this.paymentDetails.get('amount')!.value;
    amount=amount*100;

    this.stripe.createToken(this.card).then( (result:any) => {
    
      if (result.error) {
      
        // Inform the user if there was an error.
        
        var errorElement = document.getElementById('card-errors');
        
        if(errorElement!=null){
          errorElement.textContent = result.error.message;
        }
      
      } 
      else{
      
        // Send the token to your server.
        var token = result.token.id;

        console.log(token);
        console.log(amount);

        const payment_data={
          "email" : email,
          "amount" : amount,
          "token" : token
        };

        // console.log(payment_data)
        this.isLoading = true;
        this.stripeService.sendPayment(payment_data).subscribe(
          response=>{
            console.log(response);

            this.isLoading = false;
            // alert(amount/100+" INR added to the wallet");
            this.successNotification(amount);


            //Updating Wallet
            this.profileService.getProfile().subscribe(data=>{

              console.log(data);

              this.customerDetails = data;
              let walletAmount = this.customerDetails.walletAmount;
              
              console.log("Wallet Amount of Customer = " + walletAmount);

              let updatedCustDetails = this.customerDetails;
              updatedCustDetails.walletAmount += amount/100;
              this.profileService.updateProfile(updatedCustDetails).subscribe(
                data=>{
                  console.log(data);
                  location.reload();
                })
              
            })
            






            // alert(amount/100+" INR added to the wallet");

            // this.submitted=true;
          },
          error=>{
            console.log(error);
            // this.submitted=false;
          }
        )
      }
    
    });
  
  }

  checkout(amount: number) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JSc1jSJ09zwd8DycjG1rcVCXeiqCx3YXBXnhwpXIsH6LJ8K2tsj7QwkwLAmNPJ1XpITJjS6cFk7jyA4oJk3jvOI004FWXOFSD',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });
  
    strikeCheckout.open({
      name: 'GoPay Shop',
      description: 'Payment widget',
      amount: amount * 100
    });
  }
  
  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_12239293949ksdfksdjkfj1232q3jkjssdfjk',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe successfull!');
          }
        });
      }
        
      window.document.body.appendChild(scr);
    }
  }

}
