package hnm.hnm.mapper.member;

import hnm.hnm.domain.member.Authority;
import hnm.hnm.domain.member.Member;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface MemberMapper {

    long insertMember(Member member);

    int insertMemberAuthority(Authority authority);

    int updateRefreshToken(Member member);

    Member selectMemberById(Long id);

    Member selectMemberByEmail(String email);

    String selectRefreshToken(Long id);

    Member selectRefreshTokenAndEmail(Long id);

    String selectEmailToken(String email);

    String selectEmailByEmailToken(Member member);

    void updateEmailToken(String email);

    Boolean existsByEmail(String email);

    int updateMember(Member member);

    int deleteMember(Long id);

    List<Member> selectMembersList();

}
