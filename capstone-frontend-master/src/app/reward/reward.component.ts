import { Component, OnInit } from '@angular/core';
import { resourceLimits } from 'worker_threads';
import { Customer } from '../customer';
import { Reward } from '../reward';
import { ProfileService } from '../services/profile.service';
import { RewardServiceService } from '../services/reward-service.service';
import Swal from 'sweetalert2';
import { rewardCustomer } from '../rewardCustomer';
import { RowardcustomerService } from '../services/rowardcustomer.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})

export class RewardComponent implements OnInit {

  isAnyItemClicked : boolean = false;
  clickedItem : number = -1;
  isLoading = false;
  
  displayArray : Array<any> = [];

  // Data structures for intermediate operations. 
  rewards : Array<Reward> = [];
  customer : Customer = new Customer();
  errMessage : String | undefined;
  rewardFlag : boolean | undefined;
  points : number = 0;
  redeemPoints : number | undefined;
  rewardcustomer : Array<rewardCustomer> = [];
  redemption : rewardCustomer = new rewardCustomer();

  // Control variables to make the reward code visible.
  showFlag : boolean = false;
  clicked : boolean = false;

  constructor(private rewardService : RewardServiceService, private customerService : ProfileService, private redemptionService : RowardcustomerService) {
    // this.rewards.push(new Reward()); 
  }

  async ngOnInit(): Promise<void> {
    this.displayRewardPoints();
    this.displayRewards();
  }

  // Calls reward MS and displays all the reward table contents in a card interface. 
  public displayRewards(){
    this.rewardService.getAllRewards().subscribe(
      result => {this.rewards = result;

        this.getRedemptions();

        // for(let i=0; i<this.rewards.length; i++){
        //   let newReward : any = {
        //     "reward" : this.rewards[i],
        //     "codeFlag" : false,
        //     "buttonFlag" : false
        //   }
        //   this.displayArray.push(newReward);
        // }

      console.log("In get all rewards : ");
      console.log(this.rewards)
      
    },
      err => this.errMessage = err.message
    );
  }

  // Calls customer MS and displays points from teh result. 
  public displayRewardPoints(){
    this.customerService.getProfile().subscribe(
      result => {this.customer = result;
        this.points = this.customer.rewardPoints;
        console.log("In get all reward points as per customer");
        console.log(this.customer)
        
      },
        err => this.errMessage = err.message
    );
  }

  // Calls rewardcustomer MS to get all the redemption details. 
  public getRedemptions(){
    let custID = localStorage.getItem("tokenId");
    this.redemptionService.getByCustomerId(custID).subscribe(
      result => {this.rewardcustomer = result;
        console.log("In get redemtptions (reward Customer) ");
        console.log(this.rewardcustomer)
      
        this.displayNonRedeemed();
      
      },
        err => this.errMessage = err.message
    );
  }

  // On clicking the redeem button, checks if there is suficient points. 
  public onRedeem(rewardInput : any, ele: any){

    
    console.log("In onrewards")

    if(this.points > 0 && this.points - rewardInput.rewardPrice > 0){
      this.isLoading = true;
      // Set flag for divs.
      ele.codeFlag = true;
      ele.buttonFlag = true;
      
      // Update the point value and update its points value. 
      let updatePoints = this.points - rewardInput.rewardPrice;

      // Update current customer values.
      this.customer.rewardPoints = updatePoints; 

      // Make a put request to the customer MS to update the customer.
      this.customerService.updateProfile(this.customer).subscribe(
        result => {this.customer = result
        
        // Make a call to the rewardcustomer api and add this reward to it with customer value.
        this.redemption.customerId = this.customer.customerId;
        this.redemption.rewardId = rewardInput.rewardId;

        console.log(this.redemption)

        this.redemptionService.addRedemption(this.redemption).subscribe(
          result => {
            this.redemption = result;
            this.isLoading = false;
            // Swal popup with code
            Swal.fire(
            "Redeem Successful!",
            'Reward Code : '+rewardInput.rewardCode,
            "success"
            ).then(() => {
              location.reload();
            
            });
            
            
          },
          err => this.errMessage = err.message
        );
        
        },
        err => this.errMessage = err.message);

      console.log(this.customer)

      
      
    } else {

      Swal.fire('You don\'t have enough points to redeem this!');
    }
  }

  // Update the display list 
  // so that only those rewards are displayed that are 
  // not yet redeemed. 
  public displayNonRedeemed(){

    console.log("Initial list : ");
    console.log(this.rewards);

    for (let i = this.rewards.length-1; i>=0; i--){
      let currentRewardId = this.rewards[i].rewardId;
      
      if(this.rewardcustomer != []){
        if(this.rewardcustomer.some(customer => customer.rewardId === currentRewardId)){
          this.rewards.splice(i, 1);
        } else {
          continue;
        }
      }
      

    }

    // Final list after the loop
    console.log("Final List to display : ")
    console.log(this.rewards);

    for(let i=0; i<this.rewards.length; i++){
      let newReward : any = {
        "reward" : this.rewards[i],
        "codeFlag" : false,
        "buttonFlag" : false
      }
      this.displayArray.push(newReward);
    }


  }

}
