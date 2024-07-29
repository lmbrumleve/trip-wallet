package LaunchCode.project.repository;

import LaunchCode.project.models.Trip;
import LaunchCode.project.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    @Query(value="select * from User u where u.username=?", nativeQuery = true)
    User queryByUsername(String username);
}
