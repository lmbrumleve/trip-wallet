package LaunchCode.project.controller;

import LaunchCode.project.models.FavoriteRate;
import LaunchCode.project.models.Transaction;
import LaunchCode.project.models.Trip;
import LaunchCode.project.service.FavoriteRateService;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin//(origins = "http://localhost:5173")
@Table(name = "favoriteRate")
@RequestMapping("/favorite")
public class FavoriteRateController {

    @Autowired
    private FavoriteRateService favoriteRateService;
    @GetMapping("/entries")
    public ResponseEntity<List<FavoriteRate>> getCurrentUsername(Authentication authentication) {
        String username = authentication.getName();
        List<FavoriteRate> favoriteRates = favoriteRateService.findByUsername(username);
        return ResponseEntity.ok(favoriteRates);
    }

    @GetMapping("/{id}")
    public Optional<FavoriteRate> favoriteRateById (@PathVariable int id){
        return favoriteRateService.favoriteRateById(id);
    }

    @PostMapping("/add")
    public String addFavoriteRate(@RequestBody FavoriteRate favoriteRate) {
        favoriteRateService.saveFavoriteRate(favoriteRate);
        return "New favorite saved";
    }

    @PutMapping("/{id}")
    public String updateFavoriteRate (@RequestBody FavoriteRate favoriteRate, @PathVariable int id){
        System.out.println(favoriteRate);
        System.out.println(id);
        favoriteRateService.updateFavoriteRate(favoriteRate, id);
        return "Favorite Rate Updated";
    }

    @GetMapping("/getAll")
    public List<FavoriteRate> getAllFavoriteRates() {
        return favoriteRateService.getAllFavoriteRates();
    }

}
