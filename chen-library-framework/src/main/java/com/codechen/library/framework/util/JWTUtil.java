package com.codechen.library.framework.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.codechen.library.framework.domain.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author：Java陈序员
 * @date：2024-10-22 15:14
 * @description：JWT 工具类
 */
public class JWTUtil {

    private static final String CLAIM_INFO_KEY = "info";

    /**
     * 生成 Token
     *
     * @param username   用户名
     * @param userInfo   用户信息
     * @param secret     密钥
     * @param expireTime 过期时间（毫秒）
     * @return
     */
    public static String generateToken(String username, Object userInfo, String secret, Long expireTime) {
        long timestamp = System.currentTimeMillis();

        String token = JWT.create()
                .withIssuer(username)
                .withIssuedAt(new Date(timestamp))
                .withExpiresAt(new Date(timestamp + expireTime))
                .withClaim(CLAIM_INFO_KEY, JacksonUtil.beanToJSONString(userInfo))
                .sign(Algorithm.HMAC256(secret));

        return token;
    }

    /**
     * 解析 Token
     *
     * @param token  Token
     * @param secret 密钥
     * @return
     */
    public static String decodeToken(String token, String secret) {

        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(secret)).build();
        DecodedJWT decodedJWT = jwtVerifier.verify(token);

        String decode = decodedJWT.getClaim(CLAIM_INFO_KEY).asString();
        return decode;
    }

    public static void main(String[] args) {
        SysUser sysUser = new SysUser();
        sysUser.setId(100l);
        sysUser.setUsername("admin");
        sysUser.setNickName("Java陈序员");

        String token = JWTUtil.generateToken("CodeChen", sysUser, "Java陈序员", 60 * 60 * 1000l);
        System.out.println(token);
    }
}

// todo 删除测试用户类
@Data
@NoArgsConstructor
@AllArgsConstructor
class SysUser implements UserInfo {

    private Long id;

    private String username;

    private String nickName;

    @Override
    public Long getUserId() {
        return id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getUserNickName() {
        return nickName;
    }
}
