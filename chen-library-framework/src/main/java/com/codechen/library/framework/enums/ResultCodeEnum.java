package com.codechen.library.framework.enums;

import lombok.Getter;

/**
 * @author：Java陈序员
 * @date：2024-10-29 16:58
 * @description：响应码枚举类
 */
@Getter
public enum ResultCodeEnum {

    SUCCESS(200, "成功"),
    BAD_REQUEST(400, "错误的请求"),
    UNAUTHORIZED(401, "拒绝访问"),
    API_TOKEN_FAIL(403, "没有权限"),
    NOT_FOUND(404, "资源不存在"),
    METHOD_NOT_ALLOWED(405, "请求方式错误"),
    INTERNAL_SERVER_ERROR(500, "内部服务异常"),

    PARAMETER_ERROR(1000, "参数错误"),

    ;

    /** 响应码 */
    private final Integer code;

    /** 响应消息 */
    private final String message;

    private ResultCodeEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
