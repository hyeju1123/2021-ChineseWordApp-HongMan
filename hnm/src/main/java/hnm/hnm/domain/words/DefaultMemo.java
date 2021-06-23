package hnm.hnm.domain.words;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class DefaultMemo {

    private Long defaultMemoId;

    private String story;

    /** 개인 단어장 추가 여부 */
    private boolean marking;

    private Long defaultWordId;

    private Long email;
}
