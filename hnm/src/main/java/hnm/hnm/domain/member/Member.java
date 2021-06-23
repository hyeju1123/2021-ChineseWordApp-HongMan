package hnm.hnm.domain.member;

import hnm.hnm.domain.board.Board;
import hnm.hnm.domain.board.Likes;
import hnm.hnm.domain.words.DefaultMemo;
import hnm.hnm.domain.words.PrivateWord;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class Member {

    private Long memberId;

    private String email;

    private String password;

    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;

    private List<Authority> authorities = new ArrayList<>();

    private List<PrivateWord> privateWords = new ArrayList<>();

    private List<DefaultMemo> defaultMemos = new ArrayList<>();

    private List<Board> boards = new ArrayList<>();

    private List<Likes> likes = new ArrayList<>();

    public Member() {

    }

    public Member(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Member(String email, String password,
                  boolean isAccountNonExpired, boolean isAccountNonLocked,
                  boolean isCredentialsNonExpired, boolean isEnabled) {

        this.email = email;
        this.password = password;
        this.isAccountNonExpired = isAccountNonExpired;
        this.isAccountNonLocked = isAccountNonLocked;
        this.isCredentialsNonExpired = isCredentialsNonExpired;
        this.isEnabled = isEnabled;
    }
}
