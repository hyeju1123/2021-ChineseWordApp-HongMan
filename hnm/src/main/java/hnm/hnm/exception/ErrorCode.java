package hnm.hnm.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    INVALID_AUTH_INPUT(401, "AUTH_001", "INVALID_AUTH_INPUT"),
    NON_LOGIN(401, "AUTH_002", "NON_LOGIN"),
    EXPIRED_TOKEN(401, "AUTH_003", "EXPIRED_TOKEN"),
    INVALID_JWT(401, "AUTH_004", "INVALID_JWT"),
    DISCREPANCY_REFRESH_TOKEN(401, "AUTH_005", "DISCREPANCY_REFRESH_TOKEN");

    private final int status;
    private final String code;
    private final String message;

    ErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

}
