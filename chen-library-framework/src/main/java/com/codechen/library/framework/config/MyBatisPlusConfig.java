package com.codechen.library.framework.config;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.BlockAttackInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import com.codechen.library.framework.enums.LogicDeleteEnum;
import org.apache.ibatis.reflection.MetaObject;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

/**
 * @author：Java陈序员
 * @date：2024-10-22 14:17
 * @description：MyBatis Plus 配置类
 */
@Configuration
@MapperScan(basePackages = "com.codechen.library")
public class MyBatisPlusConfig {

    /** 注册插件配置 */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();

        // 分页插件
        mybatisPlusInterceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        // 禁止全表删除插件
        mybatisPlusInterceptor.addInnerInterceptor(new BlockAttackInnerInterceptor());
        // 乐观锁插件
        mybatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());

        return mybatisPlusInterceptor;
    }

    /** 自动填充字段配置 */
    @Bean
    public MetaObjectHandler metaObjectHandler() {
        return new MetaObjectHandler() {
            @Override
            public void insertFill(MetaObject metaObject) {
                // 创建时间字段
                this.setFieldValByName("creatTime", LocalDateTime.now(), metaObject);
                // 修改时间字段
                this.setFieldValByName("updateTime", LocalDateTime.now(), metaObject);
                // 逻辑删除字段
                this.setFieldValByName("deleted", LogicDeleteEnum.NOT_DELETED.getCode(), metaObject);
                // version 字段
                this.setFieldValByName("version", 1, metaObject);
            }

            @Override
            public void updateFill(MetaObject metaObject) {
                // 修改时间字段
                this.setFieldValByName("updateTime", LocalDateTime.now(), metaObject);
            }
        };
    }
}
