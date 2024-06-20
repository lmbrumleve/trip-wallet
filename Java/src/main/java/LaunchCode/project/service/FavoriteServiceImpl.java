package LaunchCode.project.service;

import LaunchCode.project.models.Transaction;
import LaunchCode.project.models.User;
import LaunchCode.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class FavoriteServiceImpl implements FavoriteService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public void updateUserFavorites(HashMap<String, Boolean> favorites, int id) {
        User user1 = userRepository.findById(id).get();
        System.out.println(favorites);
        user1.setFavorites(favorites);
        userRepository.save(user1);

    }
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