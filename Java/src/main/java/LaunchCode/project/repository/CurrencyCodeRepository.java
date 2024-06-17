package LaunchCode.project.repository;

import LaunchCode.project.models.CurrencyCode;
import LaunchCode.project.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CurrencyCodeRepository extends JpaRepository <CurrencyCode, Integer> {

    @Query(value="select * from currency_codes t where t.name=?", nativeQuery = true)
    List<CurrencyCode> queryByName(String name);

}
