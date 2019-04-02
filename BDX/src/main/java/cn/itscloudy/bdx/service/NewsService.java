package cn.itscloudy.bdx.service;

import cn.itscloudy.bdx.entity.News;

import java.util.List;

public interface NewsService {
    public abstract boolean addNews(String author, String about, String title, String content);

    public abstract News findTheLastNews(String author);

    public abstract List<News> findByLimits(int a, int size);

    public abstract News findById(int id);

    /**
     * 获取页数
     *
     * @return
     */
    public abstract int getPage_num();

    public abstract List<News> findAllTitles();
}
