package hnm.hnm.mapper.words;

import hnm.hnm.domain.words.Vocab;
import hnm.hnm.domain.words.VocabGroup;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@Mapper
public interface VocabWordMapper {

    void insertVocabGroup(VocabGroup vocabGroup);

    Long insertVocab(Vocab vocab);

    VocabGroup selectVocabGroupByName(VocabGroup vocabGroup);

    List<VocabGroup> selectVocabGroup(Long memberId);

    List<Vocab> selectVocabByGroup(@Param("memberId") Long memberId,
                                   @Param("vocabGroupId") Long vocabGroupId);

    void updateVocabWord(Vocab vocab);

    void updateByMovingVocabGroup(@Param("memberId") Long memberId,
                                  @Param("vocabIdList") List<Long> vocabIdList,
                                  @Param("groupId") Long groupId);

    void deleteVocabWord(@Param("memberId") Long memberId,
                         @Param("vocabIdList") List<Long> vocabIdList);
}
