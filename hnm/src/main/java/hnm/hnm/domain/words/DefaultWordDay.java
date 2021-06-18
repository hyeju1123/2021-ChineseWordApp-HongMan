package hnm.hnm.domain.words;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class DefaultWordDay {

    private Long defaultWordDayId;

    /** day1, day2,,, */
    private Long day;

    /** 사람1, 사람2,,, */
    private String dayName;

//    private List<DefaultWord> defaultWords = new ArrayList<>();
}
