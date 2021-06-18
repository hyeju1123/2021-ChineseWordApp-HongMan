package hnm.hnm.controller.words;

import hnm.hnm.domain.words.DefaultWordDay;
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
}
