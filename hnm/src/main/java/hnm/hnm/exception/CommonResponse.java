package hnm.hnm.exception;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommonResponse {

    private int status;
    private String code;
    private String message;
}
