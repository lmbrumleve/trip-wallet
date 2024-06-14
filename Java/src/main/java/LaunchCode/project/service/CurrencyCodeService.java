package LaunchCode.project.service;

import LaunchCode.project.models.CurrencyCode;
import LaunchCode.project.models.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CurrencyCodeService {

    List<CurrencyCode> getAllCurrencyCodes();

    void saveCurrencyCode (CurrencyCode currencyCode);
}
