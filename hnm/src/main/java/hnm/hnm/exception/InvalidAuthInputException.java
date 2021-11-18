package hnm.hnm.exception;

public class InvalidAuthInputException extends RuntimeException {

    public InvalidAuthInputException() {
        super(ErrorCode.INVALID_AUTH_INPUT.getMessage());
    }

    public InvalidAuthInputException(Exception exception) {
        super(exception);
    }
}
