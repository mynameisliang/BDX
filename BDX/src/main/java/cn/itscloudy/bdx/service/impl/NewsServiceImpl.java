package cn.itscloudy.bdx.service.impl;

import cn.itscloudy.bdx.StaticProvider;
import cn.itscloudy.bdx.entity.News;
import cn.itscloudy.bdx.mapper.NewsMapper;
import cn.itscloudy.bdx.service.NewsService;
import org.codehaus.groovy.runtime.DateGroovyMethods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service("NewsService")
public class NewsServiceImpl implements NewsService {
    @Override
    public boolean addNews(String author, String title, String about, String content) {
        mapper.create();

        //获取时间戳
        Timestamp timestamp = new Timestamp(new Date().getTime());
        mapper.insertNews(author, about, title, content, timestamp);
        //插入检查
        if ((mapper.findTheLastOne(author).getTimestamp().compareTo(timestamp)) <= 1) return true;
        return false;
    }

    @Override
    public News findTheLastNews(String author) {
        mapper.create();

        return mapper.findTheLastOne(author);
    }

    @Override
    public List<News> findByLimits(int a, int size) {
        mapper.create();

        return mapper.findByLimit(a, size);
    }

    @Override
    public News findById(int id) {
        mapper.create();

        News news = mapper.findById(id);
        news.setDate_time(DateGroovyMethods.format(news.getTimestamp(), "yyyy年MM月dd日 HH时mm分ss秒"));
        return news;
    }

    @Override
    public int getPage_num() {
        mapper.create();

        int size = mapper.count();

        if (size % pagesize == 0) return size / pagesize;
        return size / pagesize + 1;
    }

    @Override
    public List<News> findAllTitles() {
        mapper.create();

        return mapper.findAllTitles();
    }

    public int getPagesize() {
        return pagesize;
    }

    public void setPagesize(int pagesize) {
        this.pagesize = pagesize;
    }

    public NewsMapper getMapper() {
        return mapper;
    }

    public void setMapper(NewsMapper mapper) {
        this.mapper = mapper;
    }

    private int pagesize = StaticProvider.NEWS_PAGE_SIZE;
    @Autowired
    private NewsMapper mapper;
}
