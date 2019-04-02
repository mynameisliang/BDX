package cn.itscloudy.bdx.service;

import cn.itscloudy.bdx.entity.Charger;
import cn.itscloudy.bdx.entity.Member;

import java.util.List;

public interface MemberService {
    public abstract List<Member> finaAllMember();

    public abstract Member findMember(String number, String password);

    public abstract boolean modifyPassword(String id, String newPassword);

    public abstract boolean modifyGrp(String id, int newGrp);

    public abstract boolean deleteMember(String id);

    public abstract Charger findCharger(String member_id, String password);

    public abstract boolean isCharger(String member_id);

    public abstract boolean modifyChargerLevel(String member_id, int level);

    public abstract boolean addCharger(String member_id, int level);

    public abstract boolean deleteCharger(String to_delete);
}
