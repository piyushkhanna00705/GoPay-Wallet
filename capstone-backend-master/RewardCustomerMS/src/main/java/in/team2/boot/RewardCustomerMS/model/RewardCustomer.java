package in.team2.boot.RewardCustomerMS.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RewardCustomer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int redemptionId;
    private int customerId;
    private int rewardId;


}
