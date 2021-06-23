package hnm.hnm.service.words;

import hnm.hnm.domain.words.DefaultWord;
import hnm.hnm.domain.words.DefaultWordDay;
import hnm.hnm.domain.words.Meaning;
import hnm.hnm.mapper.words.DefaultWordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DefaultWordService {

    final DefaultWordMapper defaultWordMapper;

    public DefaultWord findDefaultWordDetail(Long id) {
        return defaultWordMapper.selectDefaultWordDetail(id);
    }

    public List<DefaultWordDay> findDefaultDaysList(Long id) {
        return defaultWordMapper.selectDefaultWordDayByPart(id);
    }

    public List<DefaultWord> findDefaultWordsByDay(Long id) {
        return defaultWordMapper.selectDefaultWordsByDay(id);
    }

    public List<Meaning> findMeaningsByWord(Long id) {
        return defaultWordMapper.selectMeaningsList(id);
    }
}
