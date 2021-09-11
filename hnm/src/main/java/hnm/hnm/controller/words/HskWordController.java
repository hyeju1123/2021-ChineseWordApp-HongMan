package hnm.hnm.controller.words;

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

    @GetMapping("/hskWord/findMeaning")
    public String findWordMeanings() {
        return hskWordService.findPrivateWord((long) 118);
    }
}
