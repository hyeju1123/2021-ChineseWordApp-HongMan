package hnm.hnm;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hnm.hnm.domain.words.PrivateWord;
import hnm.hnm.mapper.words.PrivateWordMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PrivateWordMapperTest {

    @Autowired
    private PrivateWordMapper privateWordMapper;

//    @Test
//    public void testOfInsert() {
//        PrivateWord privateWord = new PrivateWord();
//        privateWord.setChCharacter("渴");
//        privateWord.setMeaning("목마르다");
//        privateWord.setIntonation("kě");
//        privateWord.setStory("목이 마르면 물이 있어야 하니 \'물 수\'가 들어간다.");
//        privateWord.setSavedGroup("Unit 1");
//        privateWord.setMemberId((long) 1);
//
//        int result = privateWordMapper.insertWord(privateWord);
//        System.out.println("결과는 " + result + "입니다.");
//    }

    @Test
    public void testOfSelectDetail() {
        PrivateWord privateWord = privateWordMapper.selectPrivateWordDetail((long) 2);
        try {
            String privateWordJson = new ObjectMapper().writeValueAsString(privateWord);

            System.out.println("=========================");
            System.out.println(privateWordJson);
            System.out.println("=========================");

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }


}
