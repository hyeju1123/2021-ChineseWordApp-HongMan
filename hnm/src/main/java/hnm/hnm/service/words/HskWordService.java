package hnm.hnm.service.words;

import hnm.hnm.domain.words.Hsk;
import hnm.hnm.domain.words.PrivateWord;
import hnm.hnm.mapper.words.HskWordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HskWordService {

    final HskWordMapper hskWordMapper;

    public List<String> findHskTheme(Long hskLevel) {
        return hskWordMapper.selectHskTheme(hskLevel);
    }

    public List<Hsk> findHskWordsByLevel(Long hskLevel, String theme, Long memberId) {
        return hskWordMapper.selectHskWordsByTheme(hskLevel, theme, memberId);
    }
}
