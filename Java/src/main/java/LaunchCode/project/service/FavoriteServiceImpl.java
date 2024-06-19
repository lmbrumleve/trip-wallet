package LaunchCode.project.service;

import LaunchCode.project.models.Favorite;
import LaunchCode.project.models.User;
import LaunchCode.project.repository.FavoritesRepository;
import LaunchCode.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoriteServiceImpl implements FavoriteService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FavoritesRepository favoritesRepository;

//    @Override
//    public void updateFavorites(Favorite favorite, int id) {
//
//    }
//
    @Override
    public void saveFavorite(Favorite favorite) {
        favoritesRepository.save(favorite);

    }
//
//    @Override
//    public Favorite getFavoriteById(int ID) {
//        return null;
//    }
//
//    @Override
//    public List<Favorite> getAllFavorites() {
//        return null;
//    }

    @Override
    public Integer getUserIdByUsername(String username) {
        User user = null;
        if (userRepository.findByUsername(username).isPresent()) {
            user = (userRepository.findByUsername(username)).get();
        }
        System.out.println(user);
        if (user != null) {
            return user.getId();
        } else {
            return null;
        }
    }
}
