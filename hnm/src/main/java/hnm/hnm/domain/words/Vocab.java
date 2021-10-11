package hnm.hnm.domain.words;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Vocab {

    private Long vocabId;

    private String word;

    private String meaning;

    private String intonation;

    private String wordClass;

    private String explanation;

    private Long memberId;

    private Long vocabGroupId;
}
