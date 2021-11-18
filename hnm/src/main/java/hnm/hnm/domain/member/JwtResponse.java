package hnm.hnm.domain.member;

import hnm.hnm.config.Token;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class JwtResponse {

    //    private String accessToken;
    private Token token;
    private Boolean emailAuth;
    private Long memberId;

    public JwtResponse(Token token, Boolean emailAuth, Long memberId) {
//        this.accessToken = accessToken;
        this.token = token;
        this.emailAuth = emailAuth;
        this.memberId = memberId;
    }

}
