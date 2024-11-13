package com.codechen.library.framework.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import lombok.Getter;

/**
 * @author：Java陈序员
 * @date：2024-11-1 11:31
 * @description：逻辑删除状态枚举类
 */
@Getter
public enum LogicDeleteEnum {

    NOT_DELETED(0, "未删除"),
    DELETED(1, "已删除"),
    ;

    @EnumValue
    private final Integer code;

    private final String message;

    LogicDeleteEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
