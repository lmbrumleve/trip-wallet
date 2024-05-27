package LaunchCode.project.service;

import LaunchCode.project.models.Trip;
import LaunchCode.project.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripServiceImpl implements TripService {

    @Autowired
    private TripRepository tripRepository;

    @Override
    public void updateTrip(Trip trip, int id){
        Trip trip1 = tripRepository.findById(id).get();
        trip1.setName(trip.getName());
        trip1.setDestination((trip.getDestination()));
        trip1.setBudget(trip.getBudget());
        tripRepository.save(trip1);
        ;}

    @Override
    public void deleteTrip(int id){
        Trip trip1 = tripRepository.findById(id).get();
        tripRepository.delete(trip1);
    }

    @Override
    public void saveTrip(Trip trip) {
        tripRepository.save(trip);
    };
    @Override
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    };

    @Override
    public List<Trip> getTripsByName(String name) {
        return tripRepository.getTripsByName(name);
    };

    @Override
    public List<Trip> getTripsByDestination(String destination) {
        return tripRepository.getTripsByDestination(destination);
    };

    @Override
    public List<Trip> getTripsByBudget(double budget) {
        return tripRepository.getTripsByBudget(budget);
    };

    @Override
    public Trip getTripByID(int ID) {
        return tripRepository.findById(ID).get();
    }
}
