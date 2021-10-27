export class Customer {
    customerId : number;
    name : string;
    dob : Date;
    phoneNo : string;
    email : string;
    password : string;
    address : string;
    rewardPoints : number;
    walletAmount : any;
    walletLimit : number;


    constructor(){
        this.customerId = 0;
        this.name = "Test";
        this.dob = new Date();
        this.phoneNo = "8800091211";
        this.email = "test@test.com";
        this.password = "Test@123";
        this.address = "Test, Test City, Test Country";
        this.rewardPoints = 100;
        this.walletAmount = 5000.99;
        this.walletLimit = 100000;
    }
}