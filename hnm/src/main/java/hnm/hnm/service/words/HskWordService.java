package hnm.hnm.service.words;

import hnm.hnm.domain.words.PrivateWord;
import hnm.hnm.mapper.words.HskWordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HskWordService {

    final HskWordMapper hskWordMapper;

    public String findPrivateWord(Long id) {
        return hskWordMapper.selectHskWordMeaning(id);
    }
}
