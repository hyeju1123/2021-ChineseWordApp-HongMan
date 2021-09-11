package hnm.hnm.domain.words;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HskWord {

    private Long wordId;

    private String word;

    private String intonation;

    private String part;

    private String meaning;
}
