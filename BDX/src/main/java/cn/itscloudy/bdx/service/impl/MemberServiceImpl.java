package cn.itscloudy.bdx.service.impl;

import cn.itscloudy.bdx.entity.Charger;
import cn.itscloudy.bdx.mapper.MemberMapper;
import cn.itscloudy.bdx.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("MemberService")
public class MemberServiceImpl implements MemberService {
    @Override
    public List<Member> finaAllMember() {
        mapper.create();
        return mapper.findAll();
    }

    public Member findMember(String number, String password) {
        mapper.create();
        return mapper.findMemberByIdAndPassword(number, password);
    }

    @Override
    public boolean modifyPassword(String id, String newPassword) {
        mapper.modifyPassword(id, newPassword);

        Member member = mapper.findMemberByIdAndPassword(id, newPassword);
        if (member != null) return true;
        return false;
    }

    @Override
    public boolean modifyGrp(String id, int newGrp) {
        mapper.modifyGrp(id, newGrp);

        Member member = mapper.findMemberById(id);
        return member.getGrp().getId() == newGrp;
    }

    @Override
    public boolean deleteMember(String id) {
        mapper.deleteMember(id);
        return mapper.findMemberById(id) != null;
    }

    @Override
    public boolean isCharger(String member_id) {
        return mapper.findChargerById(member_id) != null;
    }

    @Override
    public Charger findCharger(String member_id, String password) {
        mapper.c_create();

        Charger charger = mapper.findChargerById(member_id);
        if (charger != null && charger.getMember().getPassword().equals(password)) return charger;

        return null;
    }

    @Override
    public boolean addCharger(String member_id, int level) {
        mapper.c_create();

        if (!isCharger(member_id)) return false;

        mapper.addCharger(member_id, level);

        Charger charger = mapper.findChargerById(member_id);
        return charger != null;
    }

    @Override
    public boolean deleteCharger(String to_delete) {
        mapper.deleteCharger(to_delete);
        return !isCharger(to_delete);
    }

    @Override
    public boolean modifyChargerLevel(String member_id, int level) {
        mapper.resetCharger(member_id, level);

        Charger charger = mapper.findChargerById(member_id);
        return charger.getLevel() == level;
    }

    public MemberMapper getMapper() {
        return mapper;
    }

    public void setMapper(MemberMapper mapper) {
        this.mapper = mapper;
    }

    @Autowired
    private MemberMapper mapper;
}
