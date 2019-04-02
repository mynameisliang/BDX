package cn.itscloudy.bdx.mapper;

import cn.itscloudy.bdx.StaticProvider;
import cn.itscloudy.bdx.entity.Charger;
import cn.itscloudy.bdx.mapper.provider.CreateProvider;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;
import org.springframework.stereotype.Service;
import java.util.List;

@Mapper
@Service("MemberMapper")
public interface MemberMapper {

    String table= StaticProvider.tb_Member,c_table=StaticProvider.tb_Charger;

    //查找所有成员
    @Select("SELECT * FROM "+table)
    List<Member> findAll();

    //
    @Select("SELECT * FROM "+table+" where id=#{id} and password=#{password}")
    @Results({
        @Result(id=true,column="id",property="id"),
        @Result(column="GRP_ID",property="grp",
                one=@One(select="cn.itscloudy.bdx.mapper.GrpMapper.findById",
                        fetchType=FetchType.EAGER))
    } )
    Member findMemberByIdAndPassword(@Param("id") String id, @Param("password") String password);

    @Select("select * from "+table+" where id=#{id}")
    @Results({
            @Result(id=true,column="id",property="id"),
            @Result(column="GRP_ID",property="grp",
                    one=@One(select="cn.itscloudy.bdx.mapper.GrpMapper.findById",
                            fetchType=FetchType.EAGER))
    } )
    Member findMemberById(@Param("id")String id);

    @Update("update "+table+" set password=#{new} where id=#{id}")
    void modifyPassword(@Param("id") String id,@Param("new") String newPassword);

    @Update("update "+table+" set grp=#{new} where id=#{id}" )
    void modifyGrp(@Param("id")String id,@Param("grp") int newGrp);

    @Delete("delete from "+table+" where id={id}")
    void deleteMember(@Param("id")String id);

    //--------------管理员---------
    //添加管理员
    @Insert("insert into "+c_table+" values (#{id},#{level}")
    void addCharger(@Param("id") String id, @Param("level") int level);

    //重置管理员等级
    @Update("update "+c_table+" set level=#{level} where id=#{id}")
    void resetCharger(@Param("id")String id,@Param("level") int level);

    //查找管理员
    @Select("select * from "+c_table+" where id=#{id}")
    @Results({
            @Result(id=true,column = "ID",property = "member",
                    one = @One(select = "cn.itscloudy.bdx.mapper.MemberMapper.findMemberById",fetchType = FetchType.EAGER))
    })
    Charger findChargerById(@Param("id") String id);

    //删除管理员
    @Delete("delete from "+c_table+" where id=#{id}")
    void deleteCharger(@Param("id") String id);

    //创建成员表
    @SelectProvider(type=CreateProvider.class,method = "member")
    void create();

    //创建管理员表
    @SelectProvider(type=CreateProvider.class,method = "charger")
    void c_create();
}