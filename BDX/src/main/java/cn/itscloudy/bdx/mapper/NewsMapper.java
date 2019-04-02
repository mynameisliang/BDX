package cn.itscloudy.bdx.mapper;

import cn.itscloudy.bdx.StaticProvider;
import cn.itscloudy.bdx.entity.News;
import cn.itscloudy.bdx.mapper.provider.CreateProvider;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Mapper
@Service("NewsMapper")
public interface NewsMapper {

    String table= StaticProvider.tb_News;

    @Insert("insert into "+table+" (`author`, `title`, `about`, `content`,`date`) values(#{author},#{title},#{about},#{content},#{time})")
    void insertNews(@Param("author") String member_id,@Param("title") String title,
                    @Param("about") String about,@Param("content") String content,@Param("time") Timestamp timestamp);

    @Select("select * from "+table+" order by id desc")
    @Results({
            @Result(id=true,column="id",property="id"),
            @Result(column = "DATE",property = "timestamp"),
            @Result(column="AUTHOR",property="author",
                    one=@One(select="cn.itscloudy.bdx.mapper.MemberMapper.findMemberById",
                            fetchType= FetchType.LAZY))
    })
    List<News> findAll();

    //查找数据数据条数
    @Select("select count(*) from "+table)
    int count();

    @Select("select * from "+table+" where id=#{id}")
    @Results({
            @Result(id=true,column="id",property="id"),
            @Result(column = "DATE",property = "timestamp"),
            @Result(column="AUTHOR",property="author",
                    one=@One(select="cn.itscloudy.bdx.mapper.MemberMapper.findMemberById", fetchType= FetchType.EAGER))
    })
    News findById(@Param("id") int id);

    //查找某个作者的最后一个，用于检查是否插入成功
    @Select("select * from "+table+" where author=#{author} order by id desc limit 1")
    @Results({
            @Result(id=true,column="id",property="id"),
            @Result(column = "DATE",property = "timestamp"),
            @Result(column="AUTHOR",property="author",
                    one=@One(select="cn.itscloudy.bdx.mapper.MemberMapper.findMemberById", fetchType= FetchType.LAZY))
    })
    News findTheLastOne(@Param("author") String member_id);

    @Select("select * from "+table+" where author=#{author} order by id desc")
    @Results({
            @Result(id=true,column="id",property="id"),
            @Result(column = "DATE",property = "timestamp"),
            @Result(column="AUTHOR",property="author",
                    one=@One(select="cn.itscloudy.bdx.mapper.MemberMapper.findMemberById", fetchType= FetchType.LAZY))
    })
    List<News> findByAuthor(@Param("author") String member_id);


    @Select("select id,about,title from "+table+" order by id desc limit #{a},#{size}")
    List<News> findByLimit(@Param("a") int a,@Param("size") int size);

    @Select("select id,about,title from "+table+" order by id desc")
    List<News> findAllTitles();
//    @Select("select * from "+table+" where date=#{time} order by id desc")
//    @Results({
//            @Result(id=true,column="id",property="id"),
//            @Result(column = "DATE",property = "timestamp"),
//            @Result(column="AUTHOR",property="member",
//                    one=@One(select="cn.itscloudy.bdx.mapper.MemberMapper.findMemberById",
//                            fetchType= FetchType.LAZY))
//    })
//    List<News> findByTimeStamp(@Param("time") Timestamp timestamp);

    @SelectProvider(type = CreateProvider.class,method = "news")
    void create();
}
