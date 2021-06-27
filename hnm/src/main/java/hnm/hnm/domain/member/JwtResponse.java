package hnm.hnm.domain.member;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;


@Getter @Setter
public class JwtResponse {

    private String accessToken;
    private Long memberId;

//    public JwtResponse(String accessToken) {
//        this.accessToken = accessToken;
//    }

    public JwtResponse(String accessToken, Long memberId) {
        this.accessToken = accessToken;
        this.memberId = memberId;
    }

}
