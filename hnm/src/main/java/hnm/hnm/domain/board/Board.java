package hnm.hnm.domain.board;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Board {

    private Long boardId;

    /** defaultMemo 혹은 privateWord 둘 중 하나가 저장됨 */
    private Long wordId;

    private List<Likes> likes = new ArrayList<>();

    private Long memberId;

    private LocalDateTime postingDate;
}
