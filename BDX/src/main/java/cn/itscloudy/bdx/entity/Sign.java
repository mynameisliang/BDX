package cn.itscloudy.bdx.entity;

public class Sign {
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMember_id() {
        return member_id;
    }

    public void setMember_id(String member_id) {
        this.member_id = member_id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getStatu() {
        return statu;
    }

    public void setStatu(int statu) {
        this.statu = statu;
    }

    @Override
    public String toString() {
        return "Sign{" + "memberid=" + member_id + ", date=" + date + ", time=" + time + ", statu=" + statu + "}";
    }

    private int id;
    private String member_id;
    private String date;
    private String time;
    private int statu;
}
