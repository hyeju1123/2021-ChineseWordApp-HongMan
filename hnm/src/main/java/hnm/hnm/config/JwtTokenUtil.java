package hnm.hnm.config;

import hnm.hnm.domain.member.MemberPrincipal;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil implements Serializable {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);

    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    String secret = Encoders.BASE64.encode(key.getEncoded());

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

//    public Long getMemberIdFromJWT(String token) {
//        Claims claims = Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody();
//        return Long.parseLong(claims.getSubject());
//    }
//
//    public String generateToken(MemberPrincipal memberPrincipal) {
//        Map<String, Object> claims = new HashMap<>();
//        return doGenerateToken(claims, memberPrincipal.getEmail());
//    }
//
//    private String doGenerateToken(Map<String, Object> claims, String subject) {
//        return Jwts.builder()
//                .setClaims(claims)
//                .setSubject(subject)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 5 * 1000))
//                .signWith(key).compact();
//    }
//
//    public Long getUserIdFromJWT(String token) {
//        Claims claims = Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody();
//        return Long.parseLong(claims.getSubject());
//    }
//
//    public String getEmailFromToken(String token) {
//        return getClaimFromToken(token, Claims::getSubject);
//    }
//
//    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = getAllClaimsFromToken(token);
//        return claimsResolver.apply(claims);
//    }
//
//    private Claims getAllClaimsFromToken(String token) {
//        return Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody();
//    }
//
//    public Date getExpirationDateFromToken(String token) {
//        return getClaimFromToken(token, Claims::getExpiration);
//    }
//
//    public Boolean isTokenExpired(String token) {
//        final Date expiration = getExpirationDateFromToken(token);
//        return expiration.before(new Date());
//    }
//
//    public Boolean validateToken(String token, MemberPrincipal memberPrincipal) {
//        final String email = getEmailFromToken(token);
//        return (email.equals(memberPrincipal.getEmail()) && !isTokenExpired(token));
//    }

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
