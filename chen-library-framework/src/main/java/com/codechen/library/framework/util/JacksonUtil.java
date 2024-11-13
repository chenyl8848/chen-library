package com.codechen.library.framework.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

/**
 * @author：Java陈序员
 * @date：2024-10-29 14:53
 * @description：Jackson 工具类
 */
public class JacksonUtil {

    private static final ObjectMapper mapper = new ObjectMapper();

    /**
     * Java 对象转 JSON 字符串
     *
     * @param object Java 对象
     * @return
     */
    public static String beanToJSONString(Object object) {
        try {
            String result = mapper.writeValueAsString(object);
            return result;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * JSON 字符串转 Java 对象
     *
     * @param jsonString JSON 字符串
     * @param beanClass  Java 对象类型
     * @param <T>
     * @return
     */
    public static <T> T jsonStringToBean(String jsonString, Class<T> beanClass) {
        try {
            T result = mapper.readValue(jsonString, beanClass);
            return result;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * JSON 字符串转 Java List
     *
     * @param jsonString JSON 字符串
     * @param beanClass  Java 对象类型
     * @param <T>
     * @return
     */
    public static <T> List<T> jsonStringToList(String jsonString, Class<T> beanClass) {
        JavaType javaType = mapper.getTypeFactory().constructParametricType(List.class, beanClass);

        try {
            List<T> result = mapper.readValue(jsonString, javaType);
            return result;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * JSON 字符串转 Java Map
     *
     * @param jsonString JSON 字符串
     * @param keyClass   key 类型
     * @param valueClass value 类型
     * @param <K>
     * @param <V>
     * @return
     */
    public static <K, V> Map<K, V> jsonStringToMap(String jsonString, Class<K> keyClass, Class<V> valueClass) {
        JavaType javaType = mapper.getTypeFactory().constructParametricType(Map.class, keyClass, valueClass);

        try {
            Map<K, V> result = mapper.readValue(jsonString, javaType);
            return result;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return null;
    }
}
