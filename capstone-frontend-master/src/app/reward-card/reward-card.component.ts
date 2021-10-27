import { Component, Input} from '@angular/core';
import { Reward } from '../reward';

@Component({
  selector: 'app-reward-card',
  templateUrl: './reward-card.component.html',
  styleUrls: ['./reward-card.component.css']
})
export class RewardCardComponent {

  @Input() reward: Reward;
  showFlag : boolean = false;
  clicked : boolean = false;
  
  constructor() { this.reward = new Reward();}

  onRedeem(){
    this.showFlag = true;
    this.clicked = true;
  }

}
