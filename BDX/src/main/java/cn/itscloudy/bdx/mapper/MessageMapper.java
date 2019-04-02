package cn.itscloudy.bdx.mapper;

import cn.itscloudy.bdx.StaticProvider;
import cn.itscloudy.bdx.entity.MemberMessage;
import cn.itscloudy.bdx.entity.VisitorMessage;
import cn.itscloudy.bdx.mapper.provider.CreateProvider;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Mapper
@Service("MessageMapper")
public interface MessageMapper {

    String m_table= StaticProvider.tb_member_message,v_table=StaticProvider.tb_visitor_message;

    @Insert("insert into "+m_table+" (`member_id`,`message`,`date`) values (#{member_id},#{message},#{date})")
    void insertMemberMessage(@Param("member_id") String member_id,@Param("message") String message,@Param("date") Timestamp timestamp);

    @Insert("insert into "+v_table+" (`name`,`qq`,`tel`,`email`,`message`,`date`) values (#{name},#{qq},#{tel},#{email},#{message},#{date})")
    void insertVisitorMessage(@Param("name") String name,@Param("qq") String qq,@Param("tel") String tel, @Param("email") String email,
                              @Param("message") String message,@Param("date") Timestamp timestamp);

    @Delete("delete from "+m_table+" where id=#{id}")
    void deleteMemberMessage(@Param("id") int id);

    @Delete("delete from "+v_table+" where id=#{id}")
    void deleteVisitorMessage(@Param("id") int id);

    @Select("select * from "+m_table)
    @Results({
            @Result(id = true,column = "id",property = "id"),
            @Result(column = "DATE",property = "timestamp"),
            @Result(column = "member_id",property = "member",
                    one=@One(select = "cn.itscloudy.bdx.mapper.MemberMapper.findMemberById",fetchType = FetchType.EAGER))
    })
    List<MemberMessage> findAllMemberMessage();

    @Select("select * from "+v_table)
    @Results({
            @Result(id = true,column = "id",property = "id"),
            @Result(column = "DATE",property = "timestamp")
    })
    List<VisitorMessage> findAllVisitorMessage();

    //查询信息数量
    @Select("select count(id) from "+m_table)
    int count_M();

    @Select("select count(id) from "+v_table)
    int count_V();

    //查找限定范围成员信息

    @Select("select * from "+m_table+" order by id desc limit #{from},#{size}")
    @Results({
            @Result(id = true,column = "id",property = "id"),
            @Result(column = "DATE",property = "timestamp"),
            @Result(column = "member_id",property = "member",
                    one=@One(select = "cn.itscloudy.bdx.mapper.MemberMapper.findMemberById",fetchType = FetchType.EAGER))
    })
    List<MemberMessage> findByLimit_M(@Param("from") int from, @Param("size") int size);

    //查找限定范围访问者信息
    @Select("select * from "+v_table+" order by id desc limit #{from},#{size}")
    @Results({
            @Result(id = true,column = "id",property = "id"),
            @Result(column = "DATE",property = "timestamp")
    })
    List<VisitorMessage> findByLimit_V(@Param("from") int from, @Param("size") int size);

    //通过id查找成员信息
    @Select("select * from "+m_table+" where id=#{id}")
    @Results({
            @Result(id = true,column = "id",property = "id"),
            @Result(column = "DATE",property = "timestamp"),
            @Result(column = "member_id",property = "member",
                    one=@One(select = "cn.itscloudy.bdx.mapper.MemberMapper.findMemberById",fetchType = FetchType.EAGER))
    })
    MemberMessage findMembermessageById(@Param("id") int id);

    //通过id查找访问者信息
    @Select("select * from "+v_table+" where id=#{id}")
    @Results({
            @Result(id = true,column = "id",property = "id"),
            @Result(column = "DATE",property = "timestamp")
    })
    VisitorMessage findVisitormessageById(@Param("id") int id);

    //查找最后一条成员信息
    @Select("select * from "+m_table+" where member_id=#{member_id} order by id desc limit 1")
    @Results({
            @Result(id = true,column = "id",property = "id"),
            @Result(column = "DATE",property = "timestamp"),
            @Result(column = "member_id",property = "member",
                    one=@One(select = "cn.itscloudy.bdx.mapper.MemberMapper.findMemberById",fetchType = FetchType.EAGER))
    })
    MemberMessage findTheLastMemberMessage(@Param("member_id") String member_id);

    //查找最后一条访问者信息
    @Select("select * from "+v_table+" where qq=#{qq} order by id desc limit 1")
    @Results({
            @Result(id = true,column = "id",property = "id"),
            @Result(column = "DATE",property = "timestamp")
    })
    VisitorMessage findTheLastVisitorMessage(@Param("qq") String qq);

    @SelectProvider(type = CreateProvider.class,method = "member_message")
    void create_m();

    @SelectProvider(type = CreateProvider.class,method = "visitor_message")
    void create_v();
}
