package hnm.hnm.controller.words;

import hnm.hnm.domain.words.DefaultWord;
import hnm.hnm.domain.words.DefaultWordDay;
import hnm.hnm.domain.words.Meaning;
import hnm.hnm.service.words.DefaultWordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class DefaultWordController {

    final DefaultWordService defaultWordService;

    @GetMapping("/defaultWord/getDayList")
    public List<DefaultWordDay> findDayListByPart(@RequestParam("partNum") Long partNum) {
        return defaultWordService.findDefaultDaysList(partNum);
    }

    @GetMapping("/defaultWord/getWordList")
    public List<DefaultWord> findWordListByDay(@RequestParam("dayNum") Long partNum) {
        return defaultWordService.findDefaultWordsByDay(partNum);
    }

    @GetMapping("/defaultWord/getWordDetail")
    public DefaultWord findWordDetail(@RequestParam("wordNum") Long wordNum) {
        return defaultWordService.findDefaultWordDetail(wordNum);
    }

    @GetMapping("/defaultWord/getWordMeanings")
    public List<Meaning> findWordMeanings(@RequestParam("wordNum") Long wordNum) {
        return defaultWordService.findMeaningsByWord(wordNum);
    }
}
