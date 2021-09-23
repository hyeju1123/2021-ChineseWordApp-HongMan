package hnm.hnm.domain.words;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Hsk {

    private Long hskId;

    private String word;

    private String meaning;

    private String intonation;

    private String wordClass;

    private Long level;

    private String theme;

    private Memo memo;
}
