package hnm.hnm.exception;

public class InvalidTokenException extends RuntimeException {

    public InvalidTokenException() {
        super(ErrorCode.INVALID_JWT.getMessage());
    }

    public InvalidTokenException(Exception exception) {
        super(exception);
    }
}
