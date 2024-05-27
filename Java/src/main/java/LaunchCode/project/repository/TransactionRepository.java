package LaunchCode.project.repository;

import LaunchCode.project.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    @Query(value="select * from Transaction t where t.name like ?1", nativeQuery = true)
    List<Transaction> queryByName(String name);

    @Query(value="select * from Transaction t where t.amount = ?1", nativeQuery = true)
    List<Transaction> queryByAmount(double amount);

//    @Query(value="delete * from Transaction t where t.id = ?1", nativeQuery = true)
//    void deletebyid(int id);
    @Query(value="select * from Transaction t where t.trip_id = ?1", nativeQuery = true)
    List<Transaction> queryByTripID(int id);
}
