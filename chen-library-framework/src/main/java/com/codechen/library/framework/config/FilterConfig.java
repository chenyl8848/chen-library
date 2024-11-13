package com.codechen.library.framework.config;

import com.codechen.library.framework.enums.CommonConstant;
import com.codechen.library.framework.filter.TokenFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;

/**
 * @author：Java陈序员
 * @date：2024-10-29 16:08
 * @description：Filter 配置类
 */
@Configuration
public class FilterConfig {

    /**
     * 注册 TokenFilter
     * @return
     */
    @Bean
    public FilterRegistrationBean registerTokenFilter() {
        FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new TokenFilter());
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.addInitParameter(CommonConstant.EXCLUDE_URIS_KEY, "/doc.html,/webjars/*,/swagger-resources,/v2/api-docs");
        filterRegistrationBean.setOrder(Integer.MIN_VALUE);
        return filterRegistrationBean;
    }
}
