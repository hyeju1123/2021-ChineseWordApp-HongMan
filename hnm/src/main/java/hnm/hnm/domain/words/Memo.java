package hnm.hnm.domain.words;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Memo {

    private Long memoId;

    private String meaning;

    private String intonation;

    private String wordClass;

    private String explanation;

    private Long vocabId;

    private String vocabGroupName;

    private Long hskId;

    private Long memberId;
}
