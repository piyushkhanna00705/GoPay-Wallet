package in.team2.boot.RewardMs.controller;

import in.team2.boot.RewardMs.model.Reward;
import in.team2.boot.RewardMs.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/reward")
@CrossOrigin(origins = "http://localhost:4200")
public class RewardController {

    @Autowired
    private RewardService rewardService;

    @PostMapping
    public Reward saveReward(@RequestBody Reward reward){
        return rewardService.saveReward(reward);
    }
    @PutMapping
    public Reward updateReward(@RequestBody Reward reward){
        return rewardService.saveOrUpdate(reward);
    }

    @GetMapping
    public List<Reward> getAllReward(){
        return rewardService.getAllReward();
    }

    @GetMapping("/{rewardId}")
    public Reward getRewardById(@PathVariable int rewardId){
        return rewardService.getRewardById(rewardId);
    }

    @GetMapping("/rewardCode/{rewardCode}")
    public List<Reward> getRewardByRewardCode(@PathVariable int rewardCode){
        return rewardService.getRewardByRewardCode(rewardCode);
    }

}
