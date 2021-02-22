package hnm.hnm.mapper.words;

import hnm.hnm.domain.words.DefaultWord;
import hnm.hnm.domain.words.Meaning;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface DefaultWordMapper {

    DefaultWord selectDefaultWordDetail(Long id);

    List<DefaultWord> selectDefaultWordsList();

    List<Meaning> selectMeaningsList(Long id);
}
