package cn.itscloudy.bdx.filter;

import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(filterName = "ChargerFilter", urlPatterns = "/*")
@Order(1)
public class BaseFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest http_request = (HttpServletRequest) request;
        HttpServletResponse http_response = (HttpServletResponse) response;

        //获取访问路径
        String url = http_request.getRequestURI();
//        println ("url："+url+" - "+url.startsWith("/charger/"))

        //如果不是管理员跳过
        if (url.equals("/charger") || url.startsWith("/charger/")) {
            request.setCharacterEncoding("UTF-8");
            HttpSession session = http_request.getSession();

            //如果管理员没登录
            if (session.getAttribute("charger") == null) {
                http_request.getRequestDispatcher("/charger_login_page").forward(http_request, http_response);
                return;

            }

        }


        //如果跳转的页面不存在，转到错误页
        if (url.startsWith("/page/") && !url.equals("/page/")) {
            String page = url.substring(6);

            Resource resource = new ClassPathResource("templates/" + page + ".html");

            if (!resource.exists()) {
                http_request.setAttribute("path", url);
                http_request.setAttribute("message", "页面不存在！");
                http_request.getRequestDispatcher("/404").forward(http_request, http_response);
                return;

            }

        }

//        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)))
        chain.doFilter(http_request, http_response);
    }

    @Override
    public void destroy() {

    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

}
