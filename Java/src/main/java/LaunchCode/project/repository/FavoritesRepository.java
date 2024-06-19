package LaunchCode.project.repository;

import LaunchCode.project.models.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesRepository extends JpaRepository <Favorite, Integer> {


}
