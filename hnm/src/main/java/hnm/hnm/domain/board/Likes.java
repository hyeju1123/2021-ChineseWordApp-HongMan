package hnm.hnm.domain.board;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Likes {

    private Long likesId;

    private Long boardId;

    private Long memberId;
}
