package hnm.hnm.mapper.words;

import hnm.hnm.domain.words.DefaultMemo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface DefaultMemoMapper {

    int insertDefaultMemo(DefaultMemo defaultMemo);

    DefaultMemo selectDefaultMemoDetail(Long id);

    int updateDefaultMemo(DefaultMemo defaultMemo);

    int deleteDefaultMemo(Long id);

    List<DefaultMemo> selectDefaultMemosList();
}
