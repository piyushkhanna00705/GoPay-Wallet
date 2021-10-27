package in.team2.boot.RewardMs.service;

import in.team2.boot.RewardMs.model.Reward;
import in.team2.boot.RewardMs.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RewardService {
    @Autowired
    private RewardRepository rewardRepository;

    public Reward saveReward(Reward reward){
        return rewardRepository.save(reward);
    }
    public Reward saveOrUpdate(Reward reward){
        return rewardRepository.save(reward);
    }
    public List<Reward> getAllReward(){
        return rewardRepository.findAll();
    }

    public Reward getRewardById(int id){
        Optional<Reward> reward = rewardRepository.findById(id);
        if(reward.isPresent()) return reward.get();
        return null;
    }

    public List<Reward> getRewardByRewardCode(int rewardCode){
        return rewardRepository.findByRewardCode(rewardCode);
    }


}
