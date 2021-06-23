package hnm.hnm.domain.member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter
public class MemberPrincipal implements UserDetails {

    private Long memberId;

    private String email;

    @JsonIgnore
    private String password;

    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;

    private Collection<? extends GrantedAuthority> authorities;

    public MemberPrincipal(Long memberId, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.memberId = memberId;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static MemberPrincipal create(Member member) {
        List<GrantedAuthority> authorities = member.getAuthorities().stream().map(authority ->
                new SimpleGrantedAuthority(authority.getAuthorityName().name())).collect(Collectors.toList());

        return new MemberPrincipal(
                member.getMemberId(),
                member.getEmail(),
                member.getPassword(),
                authorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
