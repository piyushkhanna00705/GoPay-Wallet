package in.team2.boot.RewardCustomerMS.service;

import in.team2.boot.RewardCustomerMS.model.RewardCustomer;
import in.team2.boot.RewardCustomerMS.repository.RewardCustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RewardCustomerService {
    @Autowired
    private RewardCustomerRepository rewardRepository;

    public RewardCustomer saveReward(RewardCustomer reward){
        return rewardRepository.save(reward);
    }
    public RewardCustomer saveOrUpdate(RewardCustomer reward){
        return rewardRepository.save(reward);
    }
    public List<RewardCustomer> getAllReward(){
        return rewardRepository.findAll();
    }

    public RewardCustomer getRewardById(int id){
        Optional<RewardCustomer> reward = rewardRepository.findById(id);
        if(reward.isPresent()) return reward.get();
        return null;
    }

    public List<RewardCustomer> getRewardByRewardId(int rewardId){
        return rewardRepository.findByRewardId(rewardId);
    }

    public List<RewardCustomer> getRewardByCustomerId(int customerId){
        return rewardRepository.findByCustomerId(customerId);
    }


}