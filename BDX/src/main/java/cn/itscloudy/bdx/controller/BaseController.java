package cn.itscloudy.bdx.controller;


import cn.itscloudy.bdx.entity.Charger;
import cn.itscloudy.bdx.entity.Member;
import cn.itscloudy.bdx.service.GrpService;
import cn.itscloudy.bdx.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@Controller
@RequestMapping("/")
public class BaseController {


//    @Qualifier("GrpService")
    @Autowired
    GrpService grpService;

    @Autowired
    MemberService memberService;


    @GetMapping("")
    public String index(){
        return "index";
    }


    //过滤器调用 进入404页面
    @GetMapping("404")
    public String page_404(HttpServletRequest request, Model model){

        model.addAttribute("path",request.getAttribute("path"));
        model.addAttribute("message",request.getAttribute("message"));
        return "error/404";
    }

    //过滤器调用 转向管理员登录页
    @GetMapping("charger_login_page")
    public String charger_login_page(){
        return "charger_login";
    }

    //页面
    @GetMapping("page/{page}")
    public String pages(@PathVariable("page")String page, HttpSession session, Model model){
       if(session.getAttribute("member")==null)
            model.addAttribute("member",session.getAttribute("member"));

        if(page.equals(""))//页面为空转向主页
            page="index";

        return page;
    }

    //输入page转向主页
    @GetMapping("page")
    public String page_index(){
        return "index";
    }


    @GetMapping("charger")
    public String charger(){
        return "charger/charger";
    }
    //不用过滤器的另一种解决方法
//    @GetMapping("charger")
//    public String charger(HttpSession session){
//        //管理员未登陆转向登录页
//        if(session.getAttribute("charger")==null)
//            return "charger_login";
//        else
//            return "charger";
//    }

    //管理员登陆
    @PostMapping("charger_login")
    public String admin_login(@RequestParam("account") String account,@RequestParam("password") String password,HttpSession session,Model model){
        //查找管理员
        Charger charger=memberService.findCharger(account,password);
        if(charger!=null){
            session.setAttribute("charger",charger);
            session.setMaxInactiveInterval(2*60);//设置Session过期时间
            return "redirect:charger/";  //重定向，防止表单的再次提交
        }

        model.addAttribute("info","账号或密码错误，请重新输入");
        return "charger_login";
    }
    //成员登陆
    @PostMapping("login")
    @ResponseBody
    Member login(@RequestParam String number, @RequestParam String password, HttpSession session){
//        System.out.println(number+" "+password+" .");
        Member member=memberService.findMember(number, password);
        if(member!=null){
//            System.out.println(member.getName()+" "+member.getGrp().getName());
            session.setAttribute("member",member);
            return member;
        }
        return new Member();
    }
}
