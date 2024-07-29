package LaunchCode.project.controller;

import LaunchCode.project.models.Currency;
import LaunchCode.project.models.Trip;
import LaunchCode.project.models.User;
import LaunchCode.project.service.CurrencyService;
import jakarta.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@Table(name="user")
public class CurrencyController {

    @Autowired
    private CurrencyService currencyService;

    @GetMapping("currency/getByUsername")
    public ResponseEntity<Currency> getCurrentUsername(Authentication authentication) {
        String username = authentication.getName();
        System.out.println(username);
        User currencyUser = currencyService.findCurrencyByUsername(username);
        Currency currency = new Currency(currencyUser.getCurrency());
        return ResponseEntity.ok(currency);
    }
}
