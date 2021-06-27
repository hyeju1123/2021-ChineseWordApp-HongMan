package hnm.hnm.service.words;

import hnm.hnm.domain.words.Meaning;
import hnm.hnm.domain.words.PrivateWord;
import hnm.hnm.mapper.words.MeaningMapper;
import hnm.hnm.mapper.words.PrivateWordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrivateWordService {

    final PrivateWordMapper privateWordMapper;
    final MeaningMapper meaningMapper;

    public int addPrivateWord(PrivateWord privateWord) {
        int result = privateWordMapper.insertWord(privateWord);
        return result;
    }
}
