package in.team2.boot.EndpointMs.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Endpoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int endpointId;
    private String endpointName;
    private String country;
    private String currency;
    private String endpointImageUrl;
    private float totalAmount;
}
