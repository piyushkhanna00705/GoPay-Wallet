import { Component, OnInit } from '@angular/core';
import { TransactionServiceService } from '../services/transaction-service.service';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {


  transactions: Array<Transaction> = [];
  
  constructor(private transService: TransactionServiceService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(){
    this.transService.getTransactions().subscribe(
      data=>{
        this.transactions = data;
        this.transactions = this.transactions.reverse();
      }, error=>{console.log(error);}
    );
  }

}
