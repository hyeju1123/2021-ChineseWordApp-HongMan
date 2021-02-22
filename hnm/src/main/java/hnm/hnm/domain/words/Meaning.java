package hnm.hnm.domain.words;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Meaning {

    private Long meaningId;

    private String meanings;

    private String wordClass;

    private WordType wordType;

    private Long wordId;
}
