package in.team2.boot.TransactionMs.service;

import in.team2.boot.TransactionMs.model.Transaction;
import in.team2.boot.TransactionMs.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction saveTransaction(Transaction transaction){
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransaction(){
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(int id){
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if(transaction.isPresent()) return transaction.get();
        return null;
    }

    public List<Transaction> getTransactionByCustomerId(int customerId){
        return transactionRepository.findByCustomerId(customerId);
    }

    public void deleteAllTransactions(){
        transactionRepository.deleteAll();
    }

    public void deleteTransactionById(int id){
        transactionRepository.deleteById(id);
    }

}
