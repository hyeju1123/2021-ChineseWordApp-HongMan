package hnm.hnm.service.words;

import hnm.hnm.domain.words.Meaning;
import hnm.hnm.domain.words.PrivateWord;
import hnm.hnm.mapper.words.MeaningMapper;
import hnm.hnm.mapper.words.PrivateWordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PrivateWordService {

    final PrivateWordMapper privateWordMapper;
    final MeaningMapper meaningMapper;

    public int addPrivateWord(PrivateWord privateWord) {
        int result = privateWordMapper.insertWord(privateWord);
        return result;
    }

    public int addPrivateMeaning(Meaning meaning) {
        int result = meaningMapper.insertMeaning(meaning);
        return result;
    }

    public List<PrivateWord> findPrivateWord(Long id) {
        return privateWordMapper.selectPrivateWordDetail(id);
    }
}
