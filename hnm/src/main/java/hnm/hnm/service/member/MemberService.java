package hnm.hnm.service.member;

import hnm.hnm.domain.member.Authority;
import hnm.hnm.domain.member.Member;
import hnm.hnm.domain.member.MemberPrincipal;
import hnm.hnm.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    final MemberMapper memberMapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Member member = memberMapper.selectMemberByEmail(email);

        if (member == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        } else {
            return MemberPrincipal.create(member);
        }

    }

//    public UserDetails loadUserById(Long id) {
//        Member member = memberMapper.selectMemberById(id);
//        if (member == null) {
//            throw new UsernameNotFoundException("User not found with id: " + id);
//        } else {
//            return MemberPrincipal.create(member);
//        }
//    }

    public Boolean checkExistingEmail(String email) {
        if (memberMapper.existsByEmail(email)) {
            System.out.println("Already Exist Email");
            return true;
        } else {
            return false;
        }
    }

    public void saveRefreshToken(Long memberId, String refreshToken) {
        Member member = new Member(memberId, refreshToken);
        memberMapper.updateRefreshToken(member);
    }

    public String getRefreshToken(Long memberId) {
        return memberMapper.selectRefreshToken(memberId);
    }

    public Member getRefreshTokenAndEmail(Long memberId) {
        return memberMapper.selectRefreshTokenAndEmail(memberId);
    }

    public Member save(Member member, Authority authority) {
        memberMapper.insertMember(member);
        authority.setMemberId(member.getMemberId());
        memberMapper.insertMemberAuthority(authority);
        return member;
    }

    public String emailCertifiedCheck(Member member) {
        return memberMapper.selectEmailByEmailToken(member);
    }

    public void emailCertifiedUpdate(String email) {
        memberMapper.updateEmailToken(email);
    }
}
