package cn.itscloudy.bdx.util;

import java.util.Date;

public class DateSupport {
    public static String getDateTime() {
        Date date = new Date();
        return String.format("%tF", date) + " " + String.format("%tT", date);
    }

    public static String getDate() {
        return String.format("%tF", new Date());
    }

    public static String getTime() {
        return String.format("%tT", new Date());
    }

    public static String getYear() {
        return String.format("%tY", new Date());
    }

    public static String getMonth() {
        return String.format("%tm", new Date());
    }

    public static String getToday() {
        return String.format("%td", new Date());
    }

}
