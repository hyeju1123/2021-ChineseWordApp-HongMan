package hnm.hnm.controller.words;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import hnm.hnm.domain.words.Meaning;
import hnm.hnm.domain.words.PrivateWord;
import hnm.hnm.service.words.PrivateWordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class PrivateWordController {

    final PrivateWordService privateWordService;

    @PostMapping("/privateWord/addWord")
    public Long addPrivateWord(@RequestBody PrivateWord privateWord) {
        System.out.println("한자: "+ privateWord.getChCharacter());
        int result = privateWordService.addPrivateWord(privateWord);
        System.out.println("after privateWordId: " + privateWord.getPrivateWordId());
        if (result == 1) {
            return privateWord.getPrivateWordId();
        } else {
            System.out.println("Failed Private Word Insertion");
            return (long) -1;
        }
    }

    @PostMapping("/privateWord/addMeanings")
    public void addPrivateMeaning(@RequestBody Map params) throws JsonProcessingException {
        String json = params.get("list").toString();
        ObjectMapper mapper = new ObjectMapper();
        List<Meaning> list = mapper.readValue(json, new TypeReference<ArrayList<Meaning>>() {});
        for (Meaning meaning : list) {
            System.out.println(meaning.getMeanings());
        }
    }
}
