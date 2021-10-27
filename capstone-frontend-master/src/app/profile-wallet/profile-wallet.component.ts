import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { Reward } from '../reward';
import { rewardCustomer } from '../rewardCustomer';
import { ProfileService } from '../services/profile.service';
import { RewardServiceService } from '../services/reward-service.service';
import { RowardcustomerService } from '../services/rowardcustomer.service';

@Component({
  selector: 'app-profile-wallet',
  templateUrl: './profile-wallet.component.html',
  styleUrls: ['./profile-wallet.component.css']
})
export class ProfileWalletComponent implements OnInit {

  errMessage : string | undefined;
  rewardcustomer : rewardCustomer = new rewardCustomer();
  customer : Customer = new Customer();
  points : number = 0;
  relevantRewards : Array<rewardCustomer> = [];
  rewards : Reward = new Reward();
  displayList : Array<Reward> = [];
  rewardsList : Array<Reward> = [];

  constructor(private rewardService : RewardServiceService, private customerService : ProfileService, private redemptionService : RowardcustomerService) { 
    // Empty Constructor
  }

  ngOnInit(): void {
    this.getRedemption();
  }

  // Here we make a request to get the rewardCustomer data as per the customer id. 
  public getRedemption(){
    let custID = localStorage.getItem("tokenId");
    this.redemptionService.getByCustomerId(custID).subscribe(
      result => {this.relevantRewards = result;
        console.log(result);
        console.log(this.relevantRewards)
      
        this.getRewards();
      
      },
        err => this.errMessage = err.message
    );
  }

  // Here we make a request to get the Rewards in total. 
  public getRewards(){
    this.rewardService.getAllRewards().subscribe(
      result => {this.rewardsList = result;
      console.log(result);
      console.log(this.rewardsList)
    
      this.getDisplayList();
        
    },
      err => this.errMessage = err.message
    );
  }

  // Populate relevant rewards in the list to be displayed. 
  public getDisplayList(){
    for(let i=0; i<this.relevantRewards.length; i++){
      let targetReward = this.rewardsList.find(x => x.rewardId == this.relevantRewards[i].rewardId);
      if(targetReward != undefined){
        this.displayList.push(targetReward);
      }
    }
  }



  
}

  // Here we make a get request to get the customer logged in currently. 
  // public getCustomer(){
  //   this.customerService.getProfile().subscribe(
  //     result => {this.customer = result;
  //       this.points = this.customer.rewardPoints;
  //       console.log(result);
  //       console.log(this.customer)},
  //       err => this.errMessage = err.message
  //   );
  // }
