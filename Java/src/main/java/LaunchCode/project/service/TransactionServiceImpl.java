package LaunchCode.project.service;

import LaunchCode.project.models.Transaction;
import LaunchCode.project.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionServiceImpl implements TransactionService{
    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public void updateTransaction(Transaction transaction, int id){
            Transaction transaction1 = transactionRepository.findById(id).get();
            transaction1.setName(transaction.getName());
            transaction1.setDescription((transaction.getDescription()));
            transaction1.setAmount(transaction.getAmount());
            transaction1.setCurrency(transaction.getCurrency());
            transactionRepository.save(transaction1);
    ;}

    public void favoriteTransaction(int id) {
        Transaction transaction1 = transactionRepository.findById(id).get();
        boolean value = transaction1.getFavorite();
        transaction1.setFavorite(!value);
        transactionRepository.save(transaction1);

    }
    @Override
    public Optional<Transaction> transactionById(int id) {return transactionRepository.findById(id);}
    @Override
    public void deleteTransaction(int id) {
        Transaction transaction = transactionRepository.findById(id).get();
        transactionRepository.delete(transaction);
    }
    @Override
    public void saveTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public List<Transaction> searchTransactionsByName(String name) {
        return transactionRepository.queryByName(name);
    }

    @Override
    public List<Transaction> searchTransactionsByAmount(double amount) {
        return transactionRepository.queryByAmount(amount);
    }
    @Override
    public List<Transaction> searchTransactionsByTripID(int id) {
        return transactionRepository.queryByTripID(id);
    }
}
