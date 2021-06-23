package hnm.hnm.domain.words;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class DefaultWord {

    private Long defaultWordId;

    private String chCharacter;

    private String intonation;

    private String explanation;

    private String sound;

    private String picture;

//    /** 1부, 2부, 3부 */
//    private Long part;
//
//    /** day1, day2,,, */
//    private Long day;
//
//    private String dayName;

    private Long defaultWordDayId;

    private List<Meaning> meanings = new ArrayList<>();

    private List<DefaultMemo> defaultMemos = new ArrayList<>();
}
