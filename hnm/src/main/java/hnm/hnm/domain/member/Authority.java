package hnm.hnm.domain.member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Authority {

    private Long authorityId;

    private AuthorityName authorityName;

    private String email;

    public Authority() {

    }

    public Authority(AuthorityName authorityName, String email) {
        this.authorityName = authorityName;
        this.email = email;
    }
}
