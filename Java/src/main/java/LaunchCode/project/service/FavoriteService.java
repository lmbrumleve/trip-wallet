
package LaunchCode.project.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public interface FavoriteService {

    void updateUserFavorites(HashMap<String, Boolean> favorites, int id);
    Integer getUserIdByUsername(String username);
}
