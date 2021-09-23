package hnm.hnm.domain.member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {

    private String email;
    private String password;
    private String oauth;

    public SignUpRequest(String email, String password, String oauth) {
        this.email = email;
        this.password = password;
        this.oauth = oauth;
    }

}
