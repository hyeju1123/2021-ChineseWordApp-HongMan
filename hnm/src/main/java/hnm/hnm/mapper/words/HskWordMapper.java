package hnm.hnm.mapper.words;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface HskWordMapper {

    String selectHskWordMeaning(Long id);
}
