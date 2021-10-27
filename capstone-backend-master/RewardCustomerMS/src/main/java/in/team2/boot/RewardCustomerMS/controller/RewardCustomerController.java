package in.team2.boot.RewardCustomerMS.controller;

import in.team2.boot.RewardCustomerMS.model.RewardCustomer;
import in.team2.boot.RewardCustomerMS.service.RewardCustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/rewardcustomer")
@CrossOrigin(origins = "http://localhost:4200")
public class RewardCustomerController {

    @Autowired
    private RewardCustomerService rewardService;

    @PostMapping
    public RewardCustomer saveReward(@RequestBody RewardCustomer reward){
        return rewardService.saveReward(reward);
    }

    @PutMapping
    public RewardCustomer updateReward(@RequestBody RewardCustomer reward){
        return rewardService.saveOrUpdate(reward);
    }

    @GetMapping
    public List<RewardCustomer> getAllReward(){
        return rewardService.getAllReward();
    }

    @GetMapping("/{rewardId}")
    public RewardCustomer getRewardById(@PathVariable int rewardId){
        return rewardService.getRewardById(rewardId);
    }

    @GetMapping("/rewardId/{rewardId}")
    public List<RewardCustomer> getRewardByRewardId(@PathVariable int rewardId){
        return rewardService.getRewardByRewardId(rewardId);
    }

    @GetMapping("/customerId/{customerId}")
    public List<RewardCustomer> getRewardByCustomerId(@PathVariable int customerId){
        return rewardService.getRewardByCustomerId(customerId);
    }


}
