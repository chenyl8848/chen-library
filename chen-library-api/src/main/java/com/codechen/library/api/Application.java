package com.codechen.library.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author：Java陈序员
 * @date：2024/6/24 16:13
 * @description：主启动类
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.codechen.library.framework", "com.codechen.library.api.controller"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }
}
