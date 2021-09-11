package hnm.hnm.domain.member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Authority {

    private Long authorityId;

    private AuthorityName authorityName;

    private Long memberId;

    public Authority() {

    }

    public Authority(AuthorityName authorityName) {
        this.authorityName = authorityName;
    }
}
