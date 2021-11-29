package hnm.hnm.controller.words;

import hnm.hnm.domain.words.Hsk;
import hnm.hnm.domain.words.Memo;
import hnm.hnm.service.words.HskWordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping("/hskWord/updateHskWord")
    public void updateHskWord(@RequestBody Memo memo) {
        hskWordService.updateHskWord(memo);
    }

    @GetMapping("/hskWord/getAllThemes")
    public List<Map<String, Object>> getAllThemes() {
        return hskWordService.getAllThemes();
    }

    @PostMapping("/hskWord/getQuizHanzi")
    public List<Map<String, String>> getQuizHanzi(@RequestBody List<Map<String, Object>> levelAndTheme) {

        for (Map<String, Object> map : levelAndTheme) {
            System.out.println(map.get("theme"));
        }

        return hskWordService.getQuizHanzi(levelAndTheme);
    }
}
