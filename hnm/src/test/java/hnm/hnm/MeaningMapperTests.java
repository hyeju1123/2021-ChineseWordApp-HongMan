package hnm.hnm;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hnm.hnm.domain.member.Member;
import hnm.hnm.domain.words.Meaning;
import hnm.hnm.domain.words.WordType;
import hnm.hnm.mapper.words.MeaningMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
public class MeaningMapperTests {

    @Autowired
    private MeaningMapper meaningMapper;

    @Test
    public void testOfInsert() {
        Meaning meaning = new Meaning();
        meaning.setMeanings("~로부터");
        meaning.setWordClass("개");
        meaning.setWordType(WordType.DEFAULTWORD);
        meaning.setWordId((long) 2);

        int result = meaningMapper.insertMeaning(meaning);
        System.out.println("결과는 " + result + "입니다.");
    }

    @Test
    public void testOfSelect() {
        Meaning meaning = meaningMapper.selectMeaningDetail((long) 3);
        try {
            String meaningJson = new ObjectMapper().writeValueAsString(meaning);

            System.out.println("=========================");
            System.out.println(meaningJson);
            System.out.println("=========================");

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
