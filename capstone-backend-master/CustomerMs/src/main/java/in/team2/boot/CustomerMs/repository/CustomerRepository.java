package in.team2.boot.CustomerMs.repository;

import in.team2.boot.CustomerMs.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Integer> {

    public Customer findByEmail(String email);
}
