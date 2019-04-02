package cn.itscloudy.bdx.controller;

import cn.itscloudy.bdx.StaticProvider;
import cn.itscloudy.bdx.entity.News;
import cn.itscloudy.bdx.service.MemberService;
import cn.itscloudy.bdx.service.MessageService;
import cn.itscloudy.bdx.service.NewsService;
import cn.itscloudy.bdx.service.SignService;
import cn.itscloudy.bdx.util.DateSupport;
import org.codehaus.groovy.runtime.DefaultGroovyMethods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/")
public class ServiceController {
    @ExceptionHandler(value = RuntimeException.class)
    @ResponseStatus(value = HttpStatus.BANDWIDTH_LIMIT_EXCEEDED)
    public String error() {
        return "error";
    }

    @GetMapping("log_check")
    @ResponseBody
    public Member log_check(HttpSession session) {
        Member member = (Member) session.getAttribute("member");
        if (member == null) {
            member = new Member();
            member.setId("-1");
            Grp grp = new Grp();
            grp.setName("北斗星");
            member.setGrp(grp);
            member.setName("Tester");
            member.setEmail("Tester@TestServer.com");
            session.setAttribute("member", member);
        }

        return member;
    }

    @GetMapping("log_out")
    @ResponseBody
    public int logout(HttpSession session) {
        DefaultGroovyMethods.println(this, "logging out");
        if (session.getAttribute("member") != null) {
            session.removeAttribute("member");
            return 1;
        }

        return 0;
    }

    @GetMapping("sign")
    @ResponseBody
    public int sign(@SessionAttribute Member member, @RequestParam int isCheckin) {
        String date = DateSupport.getDate();
        String time = DateSupport.getTime();

        if (signService.insertSignData(member.getId(), date, time, isCheckin)) return 1;
        return 0;
    }

    @GetMapping("signdata")
    @ResponseBody
    public List<Sign> signData(@RequestParam String date, HttpSession session) {
        Member member = (Member) session.getAttribute("member");
        if (member != null) {
            return signService.findData(member.getId(), date);
        }

        return null;
    }

    /**
     * 月度签到信息
     * 代码源自旧版北斗星
     */
    @GetMapping("signdata_month")
    @ResponseBody
    public HashMap<String, String> signData_month(@SessionAttribute Member member, @RequestParam String month) {
        if (!month.matches("[0-9]{4}-[0-9]{2}")) month = DateSupport.getYear() + "-" + DateSupport.getMonth();

        HashMap<String, String> result = new HashMap<String, String>();
        List<Sign> signs = signService.findMonthData(member.getId(), month);

        String daysmessage = "";
        ArrayList<String> array = new ArrayList<String>();
        for (Sign i : signs) {//遍历每个日期
            String day = i.getDate().toString().split("-")[2] + "|";
            boolean has = false;
            for (String ds : array) {
                if (ds.equals(day)) {
                    has = true;
                    break;
                }

            }

            if (!has) {
                array.add(day);
                daysmessage += (i.getDate().toString().split("-")[2] + "|");
            }

            result.put("result", daysmessage);
        }

        return result;
    }

    @PostMapping("modify_pass")
    @ResponseBody
    public int modify_password(@SessionAttribute Member member, @RequestParam String password) {
        if (memberService.modifyPassword(member.getId(), password)) return 1;
        return 0;
    }

    @GetMapping("news")
    @ResponseBody
    public List<News> getNews() {
        return newsService.findAllTitles();
    }

    @GetMapping("news_pages_num")
    @ResponseBody
    public int getPage_num() {
        return newsService.getPage_num();
    }

    @GetMapping("news_by_page")
    @ResponseBody
    public List<News> getNews_by_page(HttpSession session, @RequestParam int page) {
        if (session.getAttribute("page") == null) session.setAttribute("page", 0);

        return newsService.findByLimits(pagesize * (page - 1), pagesize);
    }

    @GetMapping("news_detail")
    @ResponseBody
    public News getNewsById(@RequestParam String id) {
        return newsService.findById(Integer.parseInt(id));
    }

    @GetMapping("message_came_from_member")
    @ResponseBody
    public int upload_member_message(@SessionAttribute("member") Member member, String message) {
        if (messageService.insertMessage_M(member.getId(), message)) return 1;
        return 0;
    }

    @GetMapping("message_came_from_visitor")
    @ResponseBody
    public int upload_visitor_message(String name, String qq, String tel, String email, String message) {
        if (messageService.insertMessage_V(name, qq, tel, email, message)) return 1;
        return 0;
    }

    @Autowired
    private SignService signService;
    @Autowired
    private MemberService memberService;
    @Autowired
    private NewsService newsService;
    @Autowired
    private MessageService messageService;
    private int pagesize = StaticProvider.NEWS_PAGE_SIZE;
}
