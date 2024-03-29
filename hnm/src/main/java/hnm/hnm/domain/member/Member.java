package hnm.hnm.domain.member;

import hnm.hnm.domain.board.Board;
import hnm.hnm.domain.board.Likes;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter @Setter
public class Member {

    private Long memberId;

    private String email;

    private String password;

    private String emailToken;

    private String snsType;

    private String refreshToken;

    private Date createDate;

    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;

    private List<Authority> authorities = new ArrayList<>();


    private List<Board> boards = new ArrayList<>();

    private List<Likes> likes = new ArrayList<>();

    public Member() {

    }

    //    public Member(String email, String password) {
//        this.email = email;
//        this.password = password;
//    }
    // for update refresh token
    public Member(Long memberId, String refreshToken) {
        this.memberId = memberId;
        this.refreshToken = refreshToken;
    }

    public Member(String email, String password, String emailToken, String snsType,
                  boolean isAccountNonExpired, boolean isAccountNonLocked,
                  boolean isCredentialsNonExpired, boolean isEnabled) {

        this.email = email;
        this.password = password;
        this.emailToken = emailToken;
        this.snsType = snsType;
        this.isAccountNonExpired = isAccountNonExpired;
        this.isAccountNonLocked = isAccountNonLocked;
        this.isCredentialsNonExpired = isCredentialsNonExpired;
        this.isEnabled = isEnabled;
    }
}
