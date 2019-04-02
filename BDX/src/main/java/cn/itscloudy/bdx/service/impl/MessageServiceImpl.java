package cn.itscloudy.bdx.service.impl;

import cn.itscloudy.bdx.StaticProvider;
import cn.itscloudy.bdx.entity.MemberMessage;
import cn.itscloudy.bdx.entity.VisitorMessage;
import cn.itscloudy.bdx.mapper.MessageMapper;
import cn.itscloudy.bdx.service.MessageService;
import org.codehaus.groovy.runtime.DateGroovyMethods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service("MessageService")
public class MessageServiceImpl implements MessageService {
    @Override
    public boolean insertMessage_M(String member_id, String message) {
        mapper.create_m();

        Timestamp timestamp = new Timestamp(new Date().getTime());
        mapper.insertMemberMessage(member_id, message, timestamp);

        //插入检查
//        println (last.toString()+" .. "+timestamp.toString()+" .- "+(last<=>timestamp))
        if ((mapper.findTheLastMemberMessage(member_id).getTimestamp().compareTo(timestamp)) <= 1) return true;

        return false;
    }

    @Override
    public boolean insertMessage_V(String name, String qq, String tel, String email, String message) {
        mapper.create_v();

        Timestamp timestamp = new Timestamp(new Date().getTime());
        mapper.insertVisitorMessage(name, qq, tel, email, message, timestamp);

        //插入检查
        if ((mapper.findTheLastVisitorMessage(qq).getTimestamp().compareTo(timestamp)) <= 1) return true;

        return false;
    }

    @Override
    public List<MemberMessage> findAll_M() {
        mapper.create_m();

        return mapper.findAllMemberMessage();
    }

    @Override
    public List<VisitorMessage> findALL_V() {
        mapper.create_v();

        return mapper.findAllVisitorMessage();
    }

    @Override
    public int num_of_memberMessagePages() {
        int size = mapper.count_M();
        if (size % pagesize == 0) return size / pagesize;
        return size / pagesize + 1;
    }

    @Override
    public int num_of_visitorMessagePages() {
        int size = mapper.count_V();
        if (size % pagesize == 0) return size / pagesize;
        return size / pagesize + 1;
    }

    @Override
    public int num_of_memberMessage() {
        return mapper.count_M();
    }

    @Override
    public int num_of_visitorMessage() {
        return mapper.count_V();
    }

    @Override
    public List<MemberMessage> findPage_M(int page) {
        mapper.create_m();

        List<MemberMessage> list = mapper.findByLimit_M(pagesize * page, pagesize);
        for (MemberMessage message : list) {
            message.setDate_time(DateGroovyMethods.format(message.getTimestamp(), "yyyy年MM月dd日 HH时mm分ss秒"));
        }

        return list;
    }

    @Override
    public List<VisitorMessage> findPage_V(int page) {
        mapper.create_v();

        List<VisitorMessage> list = mapper.findByLimit_V(pagesize * page, pagesize);
        for (VisitorMessage message : list) {
            message.setDate_time(DateGroovyMethods.format(message.getTimestamp(), "yyyy年MM月dd日 HH时mm分ss秒"));
        }

        return list;
    }

    @Override
    public MemberMessage findById_M(int id) {
        mapper.create_m();

        return mapper.findMembermessageById(id);
    }

    @Override
    public VisitorMessage findById_V(int id) {
        mapper.create_v();

        return mapper.findVisitormessageById(id);
    }

    @Override
    public boolean deleteMessage_M(int id) {
        mapper.deleteMemberMessage(id);
        return mapper.findMembermessageById(id) != null;
    }

    @Override
    public boolean deleteMessage_V(int id) {
        mapper.deleteVisitorMessage(id);
        return mapper.findVisitormessageById(id) != null;
    }

    public int getPagesize() {
        return pagesize;
    }

    public void setPagesize(int pagesize) {
        this.pagesize = pagesize;
    }

    public MessageMapper getMapper() {
        return mapper;
    }

    public void setMapper(MessageMapper mapper) {
        this.mapper = mapper;
    }

    private int pagesize = StaticProvider.MESSAGE_PAGE_SIZE;
    @Autowired
    private MessageMapper mapper;
}
