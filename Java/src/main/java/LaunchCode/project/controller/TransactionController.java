package LaunchCode.project.controller;

import LaunchCode.project.models.Transaction;
import LaunchCode.project.service.TransactionService;
import jakarta.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin//(origins = "http://localhost:5173")
@Table(name = "transaction")
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PutMapping("/update/{id}")
    public String updateTransaction (@RequestBody Transaction transaction, @PathVariable int id){
        transactionService.updateTransaction(transaction, id);
        return "Transaction Updated";
    }

    @PutMapping("/favorite/{id}")
    public String favoriteTransaction (@RequestBody Transaction transaction, @PathVariable int id){
        transactionService.favoriteTransaction(id);
        return "Transaction Updated";
    }
    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable int id){
        transactionService.deleteTransaction(id);
        return "Transaction Deleted.";
    }

    @PostMapping("/add")
    public String addTransaction(@RequestBody Transaction transaction) {
        transactionService.saveTransaction(transaction);
        return "New transaction saved";
    }

    @GetMapping("/{id}")
    public Optional<Transaction> transactionById (@PathVariable int id){
        return transactionService.transactionById(id);
    }

    @GetMapping("/getAll")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/searchByName")
    public List<Transaction> searchTransactionsByName(@RequestParam String name) {
        return transactionService.searchTransactionsByName(name);
    }

    @GetMapping("/searchByAmount")
    public List<Transaction> searchTransactionsByAmount(@RequestParam double amount) {
        return transactionService.searchTransactionsByAmount(amount);
    }

    @GetMapping("/searchByTripID")
    public List<Transaction> searchTransactionsByTripID(@RequestParam("ID") int ID) {
        return transactionService.searchTransactionsByTripID(ID);
    }
}
