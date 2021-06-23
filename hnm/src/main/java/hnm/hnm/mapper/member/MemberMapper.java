package hnm.hnm.mapper.member;

import hnm.hnm.domain.member.Authority;
import hnm.hnm.domain.member.Member;
import hnm.hnm.domain.words.PrivateWord;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface MemberMapper {

    int insertMember(Member member);

    int insertMemberAuthority(Authority authority);

    Member selectMemberById(Long id);

    Member selectMemberByEmail(String email);

    Boolean existsByEmail(String email);

    int updateMember(Member member);

    int deleteMember(Long id);

    List<Member> selectMembersList();

    int insertPrivateWords(PrivateWord privateWord);

    List<PrivateWord> selectPrivateWordsList(Long id);
}
