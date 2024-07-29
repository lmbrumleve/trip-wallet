package LaunchCode.project.service;

import LaunchCode.project.models.Trip;
import LaunchCode.project.models.User;
import LaunchCode.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CurrencyServiceImpl implements CurrencyService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findCurrencyByUsername(String username) {
        return userRepository.queryByUsername(username);
    }

}
