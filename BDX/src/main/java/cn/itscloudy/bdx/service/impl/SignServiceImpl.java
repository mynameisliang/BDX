package cn.itscloudy.bdx.service.impl;

import cn.itscloudy.bdx.mapper.SignMapper;
import cn.itscloudy.bdx.service.SignService;
import cn.itscloudy.bdx.util.DateSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("SignService")
public class SignServiceImpl implements SignService {
    @Override
    public List<Sign> findData(String id, String date) {
        mapper.create();

        if (date.length() < 1) date = DateSupport.getDate();
        return mapper.findByDateAndId(id, date);
    }

    @Override
    public List<Sign> findMonthData(String id, String month) {
        mapper.create();
        return mapper.findByMonth(id, month + "-%");
    }

    @Override
    public Sign findTheLastOne(String id) {
        mapper.create();
        return mapper.findTheLastOne(id);
    }

    @Override
    public boolean insertSignData(String id, String date, String time, int checkin) {
        mapper.create();
        mapper.insertSignData(id, date, time, checkin);

        //插入检查
        Sign sign = mapper.findTheLastOne(id);
        return sign != null && sign.getDate().equals(date) && sign.getTime().equals(time);
    }

    public SignMapper getMapper() {
        return mapper;
    }

    public void setMapper(SignMapper mapper) {
        this.mapper = mapper;
    }

    @Autowired
    private SignMapper mapper;
}
