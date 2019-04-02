package cn.itscloudy.bdx.service;

import java.util.List;

public interface SignService {
    public abstract List<Sign> findData(String id, String date);

    public abstract List<Sign> findMonthData(String id, String datelike);

    public abstract Sign findTheLastOne(String id);

    public abstract boolean insertSignData(String id, String date, String time, int checkin);
}
