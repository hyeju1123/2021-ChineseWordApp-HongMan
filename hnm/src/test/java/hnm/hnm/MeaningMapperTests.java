package hnm.hnm;

import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MeaningMapperTests {

//    @Autowired
//    private MeaningMapper meaningMapper;
//
//    @Test
//    public void testOfInsert() {
//        Meaning meaning = new Meaning();
//        meaning.setMeanings("~로부터");
//        meaning.setWordClass("개");
//        meaning.setWordType(WordType.DEFAULTWORD);
//        meaning.setWordId((long) 2);
//
//        int result = meaningMapper.insertMeaning(meaning);
//        System.out.println("결과는 " + result + "입니다.");
//    }
//
//    @Test
//    public void testOfSelect() {
//        Meaning meaning = meaningMapper.selectMeaningDetail((long) 3);
//        try {
//            String meaningJson = new ObjectMapper().writeValueAsString(meaning);
//
//            System.out.println("=========================");
//            System.out.println(meaningJson);
//            System.out.println("=========================");
//
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//    }
}
