package hnm.hnm.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidAuthInputException.class)
    protected ResponseEntity<CommonResponse> handleInvalidAuthInputException(InvalidAuthInputException e) {

        log.info("handleInvalidAuthInputException", e);

        CommonResponse response = CommonResponse.builder()
                .code(ErrorCode.INVALID_AUTH_INPUT.getCode())
                .message(e.getMessage())
                .status(ErrorCode.INVALID_AUTH_INPUT.getStatus())
                .build();

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InvalidTokenException.class)
    protected ResponseEntity<CommonResponse> handleInvalidTokenException(InvalidTokenException e) {

        log.info("handleInvalidTokenException", e);

        CommonResponse response = CommonResponse.builder()
                .code(ErrorCode.INVALID_JWT.getCode())
                .message(e.getMessage())
                .status(ErrorCode.INVALID_JWT.getStatus())
                .build();

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(DiscrepancyRefreshTokenException.class)
    protected ResponseEntity<CommonResponse> handleDiscrepancyRefreshTokenException(DiscrepancyRefreshTokenException e) {

        log.info("handleDiscrepancyRefreshTokenException", e);

        CommonResponse response = CommonResponse.builder()
                .code(ErrorCode.DISCREPANCY_REFRESH_TOKEN.getCode())
                .message(e.getMessage())
                .status(ErrorCode.DISCREPANCY_REFRESH_TOKEN.getStatus())
                .build();

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}
