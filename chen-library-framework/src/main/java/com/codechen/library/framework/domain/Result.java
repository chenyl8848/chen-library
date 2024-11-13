package com.codechen.library.framework.domain;

import com.codechen.library.framework.enums.ResultCodeEnum;
import lombok.Data;

/**
 * @author：Java陈序员
 * @date：2024-10-22 14:39
 * @description：统一返回
 */
@Data
public class Result<T> {

    /** 响应码 */
    private Integer code;

    /** 响应消息 */
    private String message;

    /** 响应数据 */
    private T data;

    private Result() {

    }

    public static <T> Result<T> build(Integer code, String message, T data) {
        Result<T> result = new Result<>();

        result.setCode(code);
        result.setMessage(message);
        result.setData(data);

        return result;
    }

    public static <T> Result<T> success(String message, T data) {
        return build(200, message, data);
    }

    public static <T> Result<T> success(String message) {
        return success(message, null);
    }

    public static <T> Result<T> success(T data) {
        return success("成功", data);
    }

    public static <T> Result<T> fail (Integer code, String message) {
        return build(code, message, null);
    }

    public static <T> Result<T> fail(String message) {
        return fail(500, message);
    }

    public static <T> Result<T> build(ResultCodeEnum resultCodeEnum, T data) {
        return build(resultCodeEnum.getCode(), resultCodeEnum.getMessage(), data);
    }
}
