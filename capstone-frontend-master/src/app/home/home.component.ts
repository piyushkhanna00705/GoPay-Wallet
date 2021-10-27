import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { TransactionServiceService } from '../services/transaction-service.service';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allTransactions?: number;
  rewards?:number;
  walletAmount?:number;

  constructor(private transService: TransactionServiceService, private profService: ProfileService) { }

  ngOnInit(): void {
    this.getTransactions();
    this.getProfile();
  }

  getTransactions(){
    let transList: Array<Transaction>;
    this.transService.getTransactions().subscribe(
      data=>{
        transList = data;
        this.allTransactions = transList.length;
      }
    );
  }

  getProfile(){
    this.profService.getProfile().subscribe(
      data=>{
        this.rewards = data.rewardPoints;
        this.walletAmount = data.walletAmount;
      }
    );
  }

}
