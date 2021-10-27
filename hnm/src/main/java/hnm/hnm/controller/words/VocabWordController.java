package hnm.hnm.controller.words;

import hnm.hnm.domain.words.Memo;
import hnm.hnm.domain.words.Vocab;
import hnm.hnm.domain.words.VocabGroup;
import hnm.hnm.service.words.HskWordService;
import hnm.hnm.service.words.VocabWordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class VocabWordController {

    final VocabWordService vocabWordService;
    final HskWordService hskWordService;

    @PostMapping("/vocabWord/makeGroup")
    public String makeVocabGroup(@RequestBody VocabGroup vocabGroup) {
        return vocabWordService.makeVocabGroup(vocabGroup);
    }

    @PostMapping("/vocabWord/makeVocab")
    public void makeVocab(@RequestBody Vocab vocab) {
        vocabWordService.addVocab(vocab);
    }

    @PostMapping("/vocabWord/makeHskVocab")
    public void makeHskVocab(@RequestBody Vocab vocab,
                             @RequestParam String hskId, @RequestParam String groupName, @RequestParam Boolean nonInserted) {
        System.out.println(vocab.getMemberId());
        System.out.println(vocab.getWord());
        System.out.println(groupName);
        vocabWordService.addVocab(vocab);
        System.out.println("vocabId: " + vocab.getVocabId());
        Memo memo = new Memo();
        Long hskIdNum = Long.parseLong(hskId);
        memo.setVocabId(vocab.getVocabId());
        memo.setMemberId(vocab.getMemberId());
        memo.setHskId(hskIdNum);
        memo.setVocabGroupName(groupName);
        if (nonInserted) {
            hskWordService.addHskIntoVocab(memo);
        } else {
            hskWordService.updateMemoInVocab(memo);
        }

    }

    @GetMapping("/vocabWord/findGroup")
    public List<VocabGroup> findVocabGroup(@RequestParam String memberId) {
        Long memberIdNum = Long.parseLong(memberId);
        return vocabWordService.findVocabGroupList(memberIdNum);
    }

    @GetMapping("/vocabWord/findVocabByGroup")
    public List<Vocab> findVocabByGroup(@RequestParam String memberId, @RequestParam String groupId) {
        Long memberIdNum = Long.parseLong(memberId);
        Long groupIdNum = Long.parseLong(groupId);
        return vocabWordService.findVocabByGroup(memberIdNum, groupIdNum);
    }

    @PostMapping("/vocabWord/updateVocabWord")
    public void updateVocabWord(@RequestBody Vocab vocab) {
        vocabWordService.updateVocabWord(vocab);
    }

    @PostMapping("/vocabWord/deleteVocabWord")
    public void deleteVocabWord(@RequestParam("memberId") String memberId, @RequestParam("vocabIdList") List<String> vocabIdList) {
        Long memberIdNum = Long.parseLong(memberId);
        List<Long> vocabIdLongList = vocabIdList.stream().map(Long::parseLong).collect(Collectors.toList());
        for (Long item : vocabIdLongList) {
            System.out.println(item);
        }
        vocabWordService.deleteVocabWord(memberIdNum, vocabIdLongList);
    }
}
