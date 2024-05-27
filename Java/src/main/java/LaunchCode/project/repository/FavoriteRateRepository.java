package LaunchCode.project.repository;

import LaunchCode.project.models.FavoriteRate;
import LaunchCode.project.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRateRepository extends JpaRepository <FavoriteRate, Integer> {

    @Query(value="select * from favorite_rate t where t.username=?", nativeQuery = true)
    List<FavoriteRate> queryByUsername(String username);
    @Query(value="select count(*) from favorite_rate t where t.username=?", nativeQuery = true)
    Integer queryByUsernameCount(String username);

}
