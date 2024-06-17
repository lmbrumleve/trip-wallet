package LaunchCode.project.service;

import LaunchCode.project.models.CurrencyCode;
import LaunchCode.project.models.Transaction;
import LaunchCode.project.repository.CurrencyCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CurrencyCodeServiceImpl implements CurrencyCodeService{
    @Autowired
    private CurrencyCodeRepository currencyCodeRepository;

    public List<CurrencyCode> getAllCurrencyCodes() {
        return currencyCodeRepository.findAll();
    }

    @Override
    public List<CurrencyCode> searchCurrencyCodesByName(String name) {
        return currencyCodeRepository.queryByName(name);
    }
    @Override
    public void saveCurrencyCode (CurrencyCode currencyCode) {
       if (searchCurrencyCodesByName(currencyCode.getName()).isEmpty()) {
           currencyCodeRepository.save(currencyCode);
       }

    }
}
