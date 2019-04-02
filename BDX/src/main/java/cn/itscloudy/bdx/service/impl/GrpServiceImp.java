package cn.itscloudy.bdx.service.impl;

import cn.itscloudy.bdx.mapper.GrpMapper;
import cn.itscloudy.bdx.service.GrpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("GrpService")
public class GrpServiceImp implements GrpService {
    @Override
    public List<Grp> findAllGrps() {
        mapper.create();
        return mapper.findAll();
    }

    public GrpMapper getMapper() {
        return mapper;
    }

    public void setMapper(GrpMapper mapper) {
        this.mapper = mapper;
    }

    @Autowired
    private GrpMapper mapper;
}
