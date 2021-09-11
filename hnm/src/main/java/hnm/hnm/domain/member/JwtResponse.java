package hnm.hnm.domain.member;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class JwtResponse {

    private String accessToken;
    private Boolean emailAuth;
    private Long memberId;

    public JwtResponse(String accessToken, Boolean emailAuth, Long memberId) {
        this.accessToken = accessToken;
        this.emailAuth = emailAuth;
        this.memberId = memberId;
    }

}
