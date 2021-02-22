package hnm.hnm;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hnm.hnm.domain.member.Member;
import hnm.hnm.mapper.member.MemberMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MapperTests {

    @Autowired
    private MemberMapper memberMapper;

    @Test
    public void testOfInsert() {
        Member member = new Member();
        member.setUserName("수아");
        member.setNickname("sooosoo");
        member.setPassword("sooosoo123");
        member.setEmail("soo@gmail.com");

        int result = memberMapper.insertMember(member);
        System.out.println("결과는 " + result + "입니다.");

    }

    @Test
    public void testOfSelectDetail() {
        Member member = memberMapper.selectMemberDetail((long) 1);
        try {
            String memberJson = new ObjectMapper().writeValueAsString(member);

            System.out.println("=========================");
            System.out.println(memberJson);
            System.out.println("=========================");

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

//    @Test
//    public void testOfPrivateWord() {
//        List<PrivateWord> privateWords = memberMapper.selectPrivateWordsList((long) 1);
//
//        for (int i = 0; i < privateWords.size(); i++) {
//            PrivateWord privateWord = privateWords.get(i);
//            System.out.println("=========================");
//            System.out.println(privateWord.getWordId());
//            System.out.println(privateWord.getChCharacter());
//            System.out.println(privateWord.getIntonation());
//            System.out.println(privateWord.getMeaning());
//            System.out.println(privateWord.getStory());
//            System.out.println(privateWord.getSavedGroup());
//            System.out.println(privateWord.getMemberId());
//            System.out.println("=========================");
//        }
//    }

}
