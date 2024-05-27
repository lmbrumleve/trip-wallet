package LaunchCode.project.service;

import LaunchCode.project.models.FavoriteRate;
import LaunchCode.project.models.Transaction;
import LaunchCode.project.models.Trip;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface FavoriteRateService {


    void updateFavoriteRate(FavoriteRate favoriteRate, int id);

    void saveFavoriteRate(FavoriteRate favoriteRate);
    FavoriteRate getFavoriteRateByID(int ID);

    List<FavoriteRate> getAllFavoriteRates();
    List<FavoriteRate> findByUsername(String username);

    Optional<FavoriteRate> favoriteRateById(int id);

}
