package LaunchCode.project.service;

import LaunchCode.project.models.Trip;
import LaunchCode.project.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CurrencyService {
    User findCurrencyByUsername(String username);

}
