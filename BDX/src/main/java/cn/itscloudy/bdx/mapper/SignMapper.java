package cn.itscloudy.bdx.mapper;

import cn.itscloudy.bdx.StaticProvider;
import cn.itscloudy.bdx.mapper.provider.CreateProvider;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Mapper
@Service("SignMapper")
public interface SignMapper{

    String table= StaticProvider.tb_Sign;

    @Select("select * from "+table+" where member_id=#{id} and date=#{date}")
    @Results({
            @Result(id=true,column="id",property="id"),
            @Result(column="ischeckin",property="statu")
    })
    List<Sign> findByDateAndId(@Param("id") String id, @Param("date") String date);

    @Select("select * from "+table+" where member_id=#{member} order by id desc limit 1")
    Sign findTheLastOne(@Param("member") String member_id);

    @Select("select * from "+table+" where member_id=#{id} and date like #{date}")
    List<Sign> findByMonth(@Param("id") String id, @Param("date") String month);

    @Insert("insert into "+table+"(`DATE`, `TIME`, `ISCHECKIN`, `MEMBER_ID`) values(#{date},#{time},#{checkin},#{member})")
    void insertSignData(@Param("member")String id,@Param("date")String data,@Param("time")String time,@Param("checkin")int checkin);

    @SelectProvider(type = CreateProvider.class,method = "sign")
    void create();
}