package in.team2.boot.RewardCustomerMS.repository;


import java.util.List;
import in.team2.boot.RewardCustomerMS.model.RewardCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardCustomerRepository extends JpaRepository<RewardCustomer,Integer>{

    public List<RewardCustomer> findByRewardId(int rewardId);
    public List<RewardCustomer> findByCustomerId(int customerId);

}