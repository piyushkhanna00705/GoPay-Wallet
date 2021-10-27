import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileData = {
    customerId: "",
    name: "",
    email: "",
    dob: "",
    password: "",
    address: "",
    phoneNo: "",
    walletAmount: "",
    walletLimit: "",
    rewardPoints: "",
    createdAt: ""
  }

  updateData = JSON.parse(JSON.stringify(this.profileData));

  constructor(private profileservice: ProfileService) { }

  ngOnInit(): void {
    this.makeProfile();
  }


  makeProfile(){
    this.profileservice.getProfile().subscribe(
      data=>{
        this.profileData = data;
        this.updateData = JSON.parse(JSON.stringify(this.profileData));
      }
    );
  }

  editInfo(){
    console.log(this.updateData);
    this.profileservice.updateProfile(this.updateData).subscribe(
      data=>{console.log(data);this.makeProfile();}, error=>{console.log(error);}
    );
  }
}
