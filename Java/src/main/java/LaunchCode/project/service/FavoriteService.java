package LaunchCode.project.service;

import LaunchCode.project.models.Favorite;
import LaunchCode.project.models.User;
import org.springframework.stereotype.Service;

@Service
public interface FavoriteService {

//    void updateFavorites(Favorite favorite, int id);
//
    void saveFavorite(Favorite favorite);
//    Favorite getFavoriteById(int ID);
//
//    List<Favorite> getAllFavorites();

    User getUserIdByUsername(String username);
}
