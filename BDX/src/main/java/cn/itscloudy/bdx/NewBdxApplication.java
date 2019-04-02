package cn.itscloudy.bdx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
////@MapperScan("cn.itscloudy.bdx.mapper")

//扫描过滤器等
@ServletComponentScan
public class NewBdxApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewBdxApplication.class, args);
	}
}
