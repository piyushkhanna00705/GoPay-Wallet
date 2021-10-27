package in.team2.boot.RewardMs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.team2.boot.RewardMs.model.Reward;

@Repository
public interface RewardRepository extends JpaRepository<Reward,Integer>{
	
	public List<Reward> findByRewardCode(int rewardCode);

}
