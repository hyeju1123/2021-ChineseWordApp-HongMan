package hnm.hnm.mapper.words;

import hnm.hnm.domain.words.Meaning;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface MeaningMapper {

    int insertMeaning(Meaning meaning);

    Meaning selectMeaningDetail(Long id);

    int updateMeaning(Meaning meaning);

    int deleteMeaning(Long id);

    List<Meaning> selectMeaningsList();
}
