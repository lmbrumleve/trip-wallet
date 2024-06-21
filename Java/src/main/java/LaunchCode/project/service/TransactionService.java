package LaunchCode.project.service;

import LaunchCode.project.models.Transaction;
import LaunchCode.project.models.Trip;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface TransactionService {
    void updateTransaction(Transaction transaction, int id);

    void favoriteTransaction(int id);
    Optional<Transaction> transactionById(int id);
    void deleteTransaction(int id);
    void saveTransaction(Transaction transaction);
    List<Transaction> getAllTransactions();
    List<Transaction> findByUsername(String username);

    List<Transaction> searchTransactionsByName(String name);

    List<Transaction> searchTransactionsByAmount(double amount);

    List<Transaction> searchTransactionsByBudgetCategory(String name);

    List<Transaction> searchTransactionsByTripID(int id);
}
