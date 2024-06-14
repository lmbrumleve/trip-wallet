package LaunchCode.project.models;

import jakarta.persistence.*;

@Entity
public class FavoriteRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private String currencyCode;

    private String username;

    private Boolean favorite;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

//    public FavoriteRate(int ID, String currencyCode, String username, Boolean favorite, User user) {
//        this.ID = ID;
//        this.currencyCode = currencyCode;
//        this.username = username;
//        this.favorite = favorite;
//        this.user = user;
//    }

    public int getID() {
        return ID;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
//TODO: Which fields do I join to associate an ID from this table with an ID from the user table?
    //There will be many rates to one user, and many users to one rate. So @ManytoMany
}
