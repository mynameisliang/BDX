package cn.itscloudy.bdx.mapper;

import cn.itscloudy.bdx.StaticProvider;
import cn.itscloudy.bdx.mapper.provider.CreateProvider;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.stereotype.Service;

import java.util.List;

@Mapper
@Service("GrpMapper")
public interface GrpMapper {

    String table= StaticProvider.tb_Grp;

    @Select("Select * from "+table)
    List<Grp> findAll();

    @Select("Select * from "+table+" where id=#{id}")
    Grp findById(int id);

    @SelectProvider(type = CreateProvider.class,method = "grp")
    void create();
}