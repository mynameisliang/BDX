package cn.itscloudy.bdx.entity;

public class Grp {
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    @Override
    public String toString() {
        return "Grp{" + "id=" + id + ", name='" + name + "\'" + ", description='" + direction + "\'" + "}";
    }

    private int id;
    private String name;
    private String direction;
}
