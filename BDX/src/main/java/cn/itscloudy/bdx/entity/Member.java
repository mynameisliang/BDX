package cn.itscloudy.bdx.entity;

import java.util.Date;

public class Member {
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Grp getGrp() {
        return grp;
    }

    public void setGrp(Grp grp) {
        this.grp = grp;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getJoin_date() {
        return join_date;
    }

    public void setJoin_date(Date join_date) {
        this.join_date = join_date;
    }

    public Date getQuit_data() {
        return quit_data;
    }

    public void setQuit_data(Date quit_data) {
        this.quit_data = quit_data;
    }

    @Override
    public String toString() {
        return "Member{" + "id='" + id + "\'" + ", grp=" + grp + ", name='" + name + "\'" + ", tel='" + tel + "\'" + ", email='" + email + "\'" + "}";
    }

    private String id;
    private Grp grp;
    private String name;
    private String password;
    private String tel;
    private String email;
    private Date join_date;
    private Date quit_data;
}
