package LaunchCode.project.controller;


import LaunchCode.project.models.AuthenticationResponse;
import LaunchCode.project.models.Favorite;
import LaunchCode.project.models.FavoriteRate;
import LaunchCode.project.models.User;
import LaunchCode.project.repository.UserRepository;
import LaunchCode.project.service.FavoriteService;
import jakarta.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

@RestController
@CrossOrigin//(origins = "http://localhost:5173")
@Table(name = "favorites")
@RequestMapping("/favorites")
public class FavoritesController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/getUserId")
    public Integer getUserIdByUsername(Authentication authentication) {
        String username = authentication.getName();
            return favoriteService.getUserIdByUsername(username);
    }

    @PostMapping("/add")
    public String addFavorites(@RequestBody Favorite favoriteObj) {
        favoriteService.saveFavorite(favoriteObj);

        return "New favorite saved";
    }
}
