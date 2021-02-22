package hnm.hnm;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hnm.hnm.domain.words.DefaultWord;
import hnm.hnm.domain.words.Meaning;
import hnm.hnm.mapper.words.DefaultWordMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class DefaultWordMapperTests {

    @Autowired
    private DefaultWordMapper defaultWordMapper;

    @Test
    public void testOfSelectDetail() {
        DefaultWord defaultWord = defaultWordMapper.selectDefaultWordDetail((long) 2);
        try {
            String defaultWordJson = new ObjectMapper().writeValueAsString(defaultWord);

            System.out.println("=========================");
            System.out.println(defaultWordJson);
            System.out.println("=========================");

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
