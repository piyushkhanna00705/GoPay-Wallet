package in.team2.boot.TransactionMs.controller;

import in.team2.boot.TransactionMs.model.Transaction;
import in.team2.boot.TransactionMs.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/transaction")
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public Transaction saveTransaction(@RequestBody Transaction transaction){
        return transactionService.saveTransaction(transaction);
    }

    @PutMapping
    public Transaction updateTransaction(@RequestBody Transaction transaction){
        return transactionService.saveTransaction(transaction);
    }

    @GetMapping
    public List<Transaction> getAllTransaction(){
        return transactionService.getAllTransaction();
    }

    @GetMapping("/{transactionId}")
    public Transaction getTransactionById(@PathVariable int transactionId){
        return transactionService.getTransactionById(transactionId);
    }

    @GetMapping("/customer/{customerId}")
    public List<Transaction> getTransactionByCustomerId(@PathVariable int customerId) {
        return transactionService.getTransactionByCustomerId(customerId);
    }

    @DeleteMapping("/delete/all")
    public void deleteAllTransactions(){
        transactionService.deleteAllTransactions();
    }

    @DeleteMapping("/delete/{transactionId}")
    public void deleteTransactionById(@PathVariable int transactionId){
        transactionService.deleteTransactionById(transactionId);
    }
}
