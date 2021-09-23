package hnm.hnm.controller.words;

import hnm.hnm.domain.words.Hsk;
import hnm.hnm.domain.words.PrivateWord;
import hnm.hnm.service.words.HskWordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class HskWordController {

    final HskWordService hskWordService;

    @GetMapping("/hskWord/getTheme")
    public List<String> getHskTheme(@RequestParam String hskLevel) {
        Long hskLevelNum = Long.parseLong(hskLevel);
        return hskWordService.findHskTheme(hskLevelNum);
    }

    @GetMapping("/hskWord/getWordsByLevel")
    public List<Hsk> getHskWordsByLevel(@RequestParam String hskLevel, @RequestParam String theme, @RequestParam String id) {
        Long hskLevelNum = Long.parseLong(hskLevel);
        Long memberId = Long.parseLong(id);
        return hskWordService.findHskWordsByLevel(hskLevelNum, theme, memberId);
    }
}
