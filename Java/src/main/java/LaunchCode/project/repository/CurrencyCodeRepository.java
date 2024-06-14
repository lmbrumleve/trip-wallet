package LaunchCode.project.repository;

import LaunchCode.project.models.CurrencyCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrencyCodeRepository extends JpaRepository <CurrencyCode, Integer> {

}
