package hnm.hnm.service.words;

import hnm.hnm.domain.words.Vocab;
import hnm.hnm.domain.words.VocabGroup;
import hnm.hnm.mapper.words.HskWordMapper;
import hnm.hnm.mapper.words.VocabWordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabWordService {

    final VocabWordMapper vocabWordMapper;
    final HskWordMapper hskWordMapper;

    public String makeVocabGroup(VocabGroup vocabGroup) {
        if (vocabWordMapper.selectVocabGroupByName(vocabGroup) != null) {
            return "duplicated name";
        }
        vocabWordMapper.insertVocabGroup(vocabGroup);
        return "ok";
    }

    public List<VocabGroup> findVocabGroupList(Long memberId) {
        return vocabWordMapper.selectVocabGroup(memberId);
    }

    public Long addVocab(Vocab vocab) {
        return vocabWordMapper.insertVocab(vocab);
    }

    public List<Vocab> findVocabByGroup(Long memberId, Long groupId) {
        return vocabWordMapper.selectVocabByGroup(memberId, groupId);
    }

    public void updateVocabWord(Vocab vocab) {
        vocabWordMapper.updateVocabWord(vocab);
    }

    public void deleteVocabWord(Long memberId, List<Long> vocabIdList) {
        vocabWordMapper.deleteVocabWord(memberId, vocabIdList);
        hskWordMapper.updateForDeletedVocab(memberId, vocabIdList);
    }
}
