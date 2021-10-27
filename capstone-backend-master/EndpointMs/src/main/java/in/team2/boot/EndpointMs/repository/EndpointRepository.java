package in.team2.boot.EndpointMs.repository;

import in.team2.boot.EndpointMs.model.Endpoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EndpointRepository extends JpaRepository<Endpoint,Integer> {

    public List<Endpoint> findByCountry(String country);

    public List<Endpoint> findByCurrency(String currency);

}
