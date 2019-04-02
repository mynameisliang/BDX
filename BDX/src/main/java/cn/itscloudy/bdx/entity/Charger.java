package cn.itscloudy.bdx.entity;

public class Charger {
    public void setMember(Member member) {
        this.member = member;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public Member getMember() {
        return member;
    }

    public int getLevel() {
        return level;
    }

    private Member member;
    private int level;
}
