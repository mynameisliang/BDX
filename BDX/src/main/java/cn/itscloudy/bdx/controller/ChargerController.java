package cn.itscloudy.bdx.controller;

import cn.itscloudy.bdx.entity.Charger;
import cn.itscloudy.bdx.entity.VisitorMessage;
import cn.itscloudy.bdx.service.MessageService;
import cn.itscloudy.bdx.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/charger")
public class ChargerController {
    @GetMapping("/")
    public String charger() {
        return "charger/charger";
    }

    @GetMapping("logout")
    public String logout(HttpSession session) {
        session.removeAttribute("charger");
        return "redirect:charger_login";
    }

    @GetMapping("addNews")
    @ResponseBody
    public int addNews(@SessionAttribute("charger") Charger author, @RequestParam String about, @RequestParam String title, @RequestParam String content) {
        //添加新闻
        if (newsService.addNews(author.getMember().getId(), about, title, content)) return 1;
        return 0;

    }

    @GetMapping("num/{kind}")
    @ResponseBody
    public int num_of_page(@PathVariable("kind") String kind) {
        int num;
        if (kind.equals("member")) num = messageService.num_of_memberMessagePages();
        else num = messageService.num_of_visitorMessagePages();
        return num;
    }

    @GetMapping("message/{kind}")
    @ResponseBody
    public List<?> getMessage(@PathVariable("kind") String kind) {
        if (kind.equals("member")) return messageService.findAll_M();
        return messageService.findALL_V();
    }

    @GetMapping("message/{kind}/{page}")
    @ResponseBody
    public List<?> getMessageOfPage(@PathVariable("kind") String kind, @PathVariable("page") String page) {
        if (kind.equals("member")) return messageService.findPage_M(Integer.parseInt(page));

        return messageService.findPage_V(Integer.parseInt(page));
    }


    @Autowired
    private NewsService newsService;
    @Autowired
    private MessageService messageService;
}
