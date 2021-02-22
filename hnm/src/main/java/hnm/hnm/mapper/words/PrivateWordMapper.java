package hnm.hnm.mapper.words;

import hnm.hnm.domain.words.PrivateWord;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface PrivateWordMapper {

    int insertWord(PrivateWord privateWord);

    PrivateWord selectPrivateWordDetail(Long id);

    int updatePrivateWord(PrivateWord privateWord);

    int deletePrivateWord(Long id);

    List<PrivateWord> selectPrivateWordsList();
}
