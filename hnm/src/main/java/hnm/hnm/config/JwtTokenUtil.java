package hnm.hnm.config;

import hnm.hnm.domain.member.MemberPrincipal;
import hnm.hnm.exception.ErrorCode;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;

import java.security.Key;
import java.util.Date;


@Component
public class JwtTokenUtil implements Serializable {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);

    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
    public static final long TOKEN_PERIOD = 1000L * 60L * 60L * 24L; // 하루
    public static final long REFRESH_PERIOD = 1000L * 60L * 60L * 24L * 30L; // 30일
    public static final long EMAIL_PERIOD = 1000L * 60L * 10L * 6L; // 60분
    //    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//    String secret = Encoders.BASE64.encode(key.getEncoded());
    private final Key key;

    public JwtTokenUtil(@Value("${jwt.secret}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // with SNS
//    public Token makeToken(Long memberId) {
//        return new Token(
//                Jwts.builder()
//                    .setSubject(Long.toString(memberId))
//                    .setIssuedAt(new Date())
//                    .setExpiration(new Date(System.currentTimeMillis() + TOKEN_PERIOD))
//                    .signWith(key).compact(),
//                Jwts.builder()
//                    .setSubject(Long.toString(memberId))
//                    .setIssuedAt(new Date())
//                    .setExpiration(new Date(System.currentTimeMillis() + REFRESH_PERIOD))
//                    .signWith(key).compact()
//        );
//    }

    public Token generateToken(String email) {
        return new Token(
                Jwts.builder()
                        .setSubject(email)
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + TOKEN_PERIOD))
                        .signWith(key, SignatureAlgorithm.HS512).compact(),
                Jwts.builder()
                        .setSubject(email)
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + REFRESH_PERIOD))
                        .signWith(key, SignatureAlgorithm.HS512).compact()
        );
    }

    public String generateEmailToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EMAIL_PERIOD))
                .signWith(key, SignatureAlgorithm.HS512).compact();
    }

//    public String generateToken(Authentication authentication) {
//        MemberPrincipal memberPrincipal = (MemberPrincipal) authentication.getPrincipal();
//        return Jwts.builder()
//                .setSubject(Long.toString(memberPrincipal.getMemberId()))
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
//                .signWith(key).compact();
//    }

//    public String getMemberIdFromJWT(String token) {
//        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
////        return Long.parseLong(claims.getSubject());
//        return claims.getSubject();
//    }

    public String getEmailFromJWT(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String authToken, HttpServletRequest request) {
        try {
            System.out.println("validationToken: " + authToken);
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken);
            return true;
        } catch (SignatureException exception) {
            logger.error("Invalid JWT signature");
            request.setAttribute("exception", ErrorCode.INVALID_JWT.getCode());
        } catch (MalformedJwtException exception) {
            logger.error("Invalid JWT token");
            request.setAttribute("exception", ErrorCode.INVALID_JWT.getCode());
        } catch (ExpiredJwtException exception) {
            logger.error("Expired JWT token");
            request.setAttribute("exception", ErrorCode.EXPIRED_TOKEN.getCode());
        } catch (UnsupportedJwtException exception) {
            logger.error("Unsupported JWT token");
            request.setAttribute("exception", ErrorCode.INVALID_JWT.getCode());
        }
        return false;
    }
}
