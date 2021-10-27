export class Reward {
    rewardId : number;
    rewardName : String;
    rewardPrice : number;
    rewardCode : String;
    rewardImageUrl : String;
    description : String;

    constructor () {
        this.rewardId = 0;
        this.rewardName = "Natwest Reward";
        this.rewardCode = "ABCDEF5679";
        this.rewardPrice = 500;
        this.rewardImageUrl = "https://www.creativegroupinc.com/wp-content/uploads/2020/01/Reward-Blog.png";
        this.description = "This is a special discount brought for you. Consume by 6 September 2021.";
    }


}