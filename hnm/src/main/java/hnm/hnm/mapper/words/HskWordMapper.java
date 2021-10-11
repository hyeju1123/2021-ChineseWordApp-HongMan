package hnm.hnm.mapper.words;

import hnm.hnm.domain.words.Hsk;
import hnm.hnm.domain.words.Memo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface HskWordMapper {

    List<String> selectHskTheme(Long hskLevel);

    List<Hsk> selectHskWordsByTheme(@Param("level") Long level,
                                    @Param("theme") String theme,
                                    @Param("memberId") Long memberId);

    Memo selectMemo(@Param("memberId") Long memberId, @Param("hskId") Long hskId);

    void insertMemo(Memo memo);

    void updateMemo(Memo memo);

    void insertHskIntoVocab(Memo memo);

    void updateMemoInVocab(Memo memo);
}
