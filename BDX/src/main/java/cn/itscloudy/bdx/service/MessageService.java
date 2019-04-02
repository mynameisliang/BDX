package cn.itscloudy.bdx.service;

import cn.itscloudy.bdx.entity.MemberMessage;
import cn.itscloudy.bdx.entity.VisitorMessage;

import java.util.List;

public interface MessageService {
    public abstract boolean insertMessage_M(String member_id, String message);

    public abstract boolean insertMessage_V(String name, String qq, String tel, String email, String message);

    public abstract List<MemberMessage> findAll_M();

    public abstract List<VisitorMessage> findALL_V();

    public abstract int num_of_memberMessagePages();

    public abstract int num_of_visitorMessagePages();

    public abstract int num_of_memberMessage();

    public abstract int num_of_visitorMessage();

    public abstract List<MemberMessage> findPage_M(int page);

    public abstract List<VisitorMessage> findPage_V(int page);

    public abstract MemberMessage findById_M(int id);

    public abstract VisitorMessage findById_V(int id);

    public abstract boolean deleteMessage_M(int id);

    public abstract boolean deleteMessage_V(int id);
}
