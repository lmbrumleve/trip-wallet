package LaunchCode.project.repository;

import LaunchCode.project.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Integer> {
    @Query(value="SELECT * FROM Trip t WHERE t.name like ?1", nativeQuery = true)
    List<Trip> getTripsByName(String name);

    @Query(value="SELECT * FROM Trip t WHERE t.destination like ?1", nativeQuery = true)
    List<Trip> getTripsByDestination(String destination);

    @Query(value="SELECT * FROM Trip t WHERE t.budget <= ?1", nativeQuery = true)
    List<Trip> getTripsByBudget(double budget);
}
