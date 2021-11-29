package hnm.hnm.service.words;

import hnm.hnm.domain.words.Hsk;
import hnm.hnm.domain.words.Memo;
import hnm.hnm.mapper.words.HskWordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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

    public void updateHskWord(Memo memo) {
        if (hskWordMapper.selectMemo(memo.getMemberId(), memo.getHskId()) != null) {
            hskWordMapper.updateMemo(memo);
        } else {
            hskWordMapper.insertMemo(memo);
        }
    }

    public void addHskIntoVocab(Memo memo) {
        hskWordMapper.insertHskIntoVocab(memo);
    }

    public void updateMemoInVocab(Memo memo) {
        hskWordMapper.updateMemoInVocab(memo);
    }

    public List<Map<String, Object>> getAllThemes() {
        return hskWordMapper.selectAllThemes();
    }

    public List<Map<String, String>> getQuizHanzi(List<Map<String, Object>> levelAndTheme) {
        return hskWordMapper.selectQuizHanzi(levelAndTheme);
    }
}
