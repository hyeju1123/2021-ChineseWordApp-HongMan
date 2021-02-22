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

    private String userName;

    private String nickname;

    private String password;

    private String email;

    private List<PrivateWord> privateWords = new ArrayList<>();

    private List<DefaultMemo> defaultMemos = new ArrayList<>();

    private List<Board> boards = new ArrayList<>();

    private List<Likes> likes = new ArrayList<>();
}
