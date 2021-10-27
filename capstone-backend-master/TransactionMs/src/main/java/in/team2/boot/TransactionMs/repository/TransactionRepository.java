package in.team2.boot.TransactionMs.repository;

import in.team2.boot.TransactionMs.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer> {

    public List<Transaction> findByCustomerId(int customerId);

}
