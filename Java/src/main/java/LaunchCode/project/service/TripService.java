package LaunchCode.project.service;

import LaunchCode.project.models.Trip;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TripService {

    void updateTrip(Trip trip, int id);

    void deleteTrip(int id);

    void saveTrip(Trip trip);

    List<Trip> getAllTrips();

    List<Trip> getTripsByName(String name);
    List<Trip> getTripsByDestination(String destination);

    List<Trip> getTripsByBudget(double budget);

    Trip getTripByID(int ID);
}
