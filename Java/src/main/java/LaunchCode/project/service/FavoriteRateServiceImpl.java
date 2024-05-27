package LaunchCode.project.service;

import LaunchCode.project.models.FavoriteRate;
import LaunchCode.project.models.Transaction;
import LaunchCode.project.repository.FavoriteRateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteRateServiceImpl implements FavoriteRateService{

    @Autowired
    private FavoriteRateRepository favoriteRateRepository;
    @Override
    public void saveFavoriteRate(FavoriteRate favoriteRate) {
//        System.out.println("reached");
//        Integer count = favoriteRateRepository.queryByUsernameCount(favoriteRate.getUsername());
//        System.out.println(count);
////        //TODO: for some reason the count is 32 in the table when I want it to be only 30 so this needs fixing
//        if (count < 32) {
            favoriteRateRepository.save(favoriteRate);
//        }
    }
    @Override
    public FavoriteRate getFavoriteRateByID(int ID) {
        return favoriteRateRepository.findById(ID).get();
    }
    @Override
    public void updateFavoriteRate(FavoriteRate favoriteRate, int id){
        System.out.println(favoriteRate.getFavorite());
        System.out.println(id);
        FavoriteRate favoriteRate1 = favoriteRateRepository.findById(id).get();
        favoriteRate1.setFavorite(!favoriteRate1.getFavorite());
        favoriteRateRepository.save(favoriteRate1);
        }

    @Override
    public List<FavoriteRate> getAllFavoriteRates() {
        System.out.println(favoriteRateRepository.findAll());
        return favoriteRateRepository.findAll();
    }

    @Override
    public List<FavoriteRate> findByUsername(String username) {
        return favoriteRateRepository.queryByUsername(username);
    }

    @Override
    public Optional<FavoriteRate> favoriteRateById(int id) {return favoriteRateRepository.findById(id);}
}
