package hnm.hnm.mapper.words;

import hnm.hnm.domain.words.Hsk;
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
}
