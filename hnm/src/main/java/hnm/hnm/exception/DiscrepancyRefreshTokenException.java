package hnm.hnm.exception;

public class DiscrepancyRefreshTokenException extends RuntimeException {

    public DiscrepancyRefreshTokenException() {
        super(ErrorCode.DISCREPANCY_REFRESH_TOKEN.getMessage());
    }

    public DiscrepancyRefreshTokenException(Exception exception) {
        super(exception);
    }
}
