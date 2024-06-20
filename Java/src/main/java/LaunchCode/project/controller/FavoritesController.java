package LaunchCode.project.controller;

import LaunchCode.project.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin//(origins = "http://localhost:5173")
@RequestMapping("/favorites")
public class FavoritesController {
        @Autowired
        private FavoriteService favoriteService;

        @GetMapping("/getUserId")
        public Integer getUserIdByUsername(Authentication authentication) {
            String username = authentication.getName();
            return favoriteService.getUserIdByUsername(username);
        }

    @PutMapping("/update/{id}")
    public String updateUserFavorites(@RequestBody HashMap <String, Boolean> favorites, @PathVariable int id) {

        favoriteService.updateUserFavorites(favorites, id);

        return "New favorite saved";
    }

    }
