package in.team2.boot.RewardMs.model;

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
public class Reward {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rewardId;
	private String rewardName;
    private int rewardPrice;
    private int rewardCode;
    private String rewardImageUrl;
    private String description;

}
