package hnm.hnm.config;

import hnm.hnm.exception.ErrorCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

//    private static final long serialVersionUID = -7858869558953243875L;
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        logger.error("Responding with unauthorized error. Message - {}", authException.getMessage());
        String exception = (String) request.getAttribute("exception");
        ErrorCode errorCode;
        logger.error("log: exception: {} ", exception);

        /*
          토큰 없는 경우
         */
        if (exception == null) {
            errorCode = ErrorCode.NON_LOGIN;
            setResponse(response, errorCode);
            return;
        }

        /*
          토큰 만료된 경우
         */
        if (exception.equals(ErrorCode.EXPIRED_TOKEN.getCode())) {
            errorCode = ErrorCode.EXPIRED_TOKEN;
            setResponse(response, errorCode);
            return;
        }

        /*
          유효하지 않은 시그니처, 토큰일 경우
         */
        if (exception.equals(ErrorCode.INVALID_JWT.getCode())) {
            errorCode = ErrorCode.INVALID_JWT;
            setResponse(response, errorCode);
        }

//        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");

    }

    private void setResponse(HttpServletResponse response, ErrorCode errorCode) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().println("{ \"message\" : \"" + errorCode.getMessage()
                + "\", \"code\" : \"" +  errorCode.getCode()
                + "\", \"status\" : " + errorCode.getStatus()
                + "}");

    }
}
