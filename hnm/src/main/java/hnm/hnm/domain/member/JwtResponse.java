package hnm.hnm.domain.member;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class JwtResponse {

    private String accessToken;

    public JwtResponse(String accessToken) {
        this.accessToken = accessToken;
    }

}
