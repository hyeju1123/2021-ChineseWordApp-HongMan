package hnm.hnm.config;

import hnm.hnm.domain.member.MemberPrincipal;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.io.Serializable;
import java.util.Date;


@Component
public class JwtTokenUtil implements Serializable {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);

    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
    public static final long TOKEN_PERIOD = 1000L * 60L * 60L * 7L;  // 1주
    public static final long REFRESH_PERIOD = 1000L * 60L * 60L * 30L * 6L; // 6달
    public static final long EMAIL_PERIOD = 1000L * 60L * 10L * 6L; // 60분
    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    String secret = Encoders.BASE64.encode(key.getEncoded());

    // with SNS
    public Token makeToken(Long memberId) {
        return new Token(
                Jwts.builder()
                    .setSubject(Long.toString(memberId))
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + TOKEN_PERIOD))
                    .signWith(key).compact(),
                Jwts.builder()
                    .setSubject(Long.toString(memberId))
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + REFRESH_PERIOD))
                    .signWith(key).compact()
        );
    }

    public String generateEmailToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EMAIL_PERIOD))
                .signWith(key).compact();
    }

    public String generateToken(Authentication authentication) {
        MemberPrincipal memberPrincipal = (MemberPrincipal) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(Long.toString(memberPrincipal.getMemberId()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(key).compact();
    }

    public Long getMemberIdFromJWT(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody();
        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            System.out.println("validationToken: " + authToken);
            Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(authToken);
            return true;
        } catch (SignatureException exception) {
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException exception) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException exception) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException exception) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException exception) {
            logger.error("JWT claims string is empty");
        }
        return false;
    }
}
