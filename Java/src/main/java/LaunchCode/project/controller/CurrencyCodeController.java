package LaunchCode.project.controller;

import LaunchCode.project.models.CurrencyCode;
import LaunchCode.project.models.FavoriteRate;
import LaunchCode.project.models.Transaction;
import LaunchCode.project.service.CurrencyCodeService;
import jakarta.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin//(origins = "http://localhost:5173")
@Table(name = "currency_code")
@RequestMapping("/currencyCode")
public class CurrencyCodeController {

    @Autowired
    private CurrencyCodeService currencyCodeService;

    @GetMapping("/getAll")
    public List<CurrencyCode> getAllCurrencyCodes() {
        return currencyCodeService.getAllCurrencyCodes();
    }

    @PostMapping("/add")
    public String addFavoriteRate(@RequestBody CurrencyCode currencyCode) {
        currencyCodeService.saveCurrencyCode(currencyCode);
        return "New currency code saved";
    }
}
