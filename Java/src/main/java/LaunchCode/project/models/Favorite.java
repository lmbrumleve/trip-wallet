package LaunchCode.project.models;

import jakarta.persistence.*;

@Entity
@Table(name = "favorites")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;

    @ManyToOne
    @JoinColumn(name="currency_codes_id")
    private CurrencyCode currencyCode;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    private Boolean favorite;

    public Favorite () {

    }

    public Favorite(int ID, Boolean favorite) {
        this.ID = ID;
        this.favorite = favorite;
    }

    public int getID() {
        return ID;
    }

    public CurrencyCode getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(CurrencyCode currencyCode) {
        this.currencyCode = currencyCode;
    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }

    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    public User getUser() {
        return user;
    }

//TODO: Which fields do I join to associate an ID from this table with an ID from the user table?
    //There will be many rates to one user, and many users to one rate. So @ManytoMany
}
