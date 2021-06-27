package hnm.hnm.controller.member;

import hnm.hnm.config.JwtTokenUtil;
import hnm.hnm.domain.member.*;
import hnm.hnm.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class MemberController {

    final AuthenticationManager authenticationManager;
    final PasswordEncoder passwordEncoder;
    final JwtTokenUtil jwtTokenUtil;
    final MemberService memberService;

    @PostMapping("/auth/signIn")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) throws Exception {
        System.out.println("signIn: " + loginRequest.getEmail());
        System.out.println("password: " + loginRequest.getPassword());


//        Authentication authenticate = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        loginRequest.getEmail(),
//                        loginRequest.getPassword()
//                )
//        );

        Authentication authenticate = authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        System.out.println("authenticate: " + authenticate);

        SecurityContextHolder.getContext().setAuthentication(authenticate);

        String jwt = jwtTokenUtil.generateToken(authenticate);

        MemberPrincipal memberPrincipal = (MemberPrincipal) authenticate.getPrincipal();
        Long memberId = memberPrincipal.getMemberId();

        return ResponseEntity.ok(new JwtResponse(jwt, memberId));
    }

    private Authentication authenticate(String email, String password) throws Exception {
        Authentication authenticate = null;
        try {
            authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
        return authenticate;
    }

    @PostMapping("/auth/signUp")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        if (memberService.checkExistingEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false, "This email is already taken"),
                    HttpStatus.BAD_REQUEST);
        }

        System.out.println("sign up password: " + signUpRequest.getPassword());
        System.out.println("encoded: " + passwordEncoder.encode(signUpRequest.getPassword()));


        Member member = new Member(signUpRequest.getEmail(), signUpRequest.getPassword(),
                true, true, true, true);

        System.out.println("member password: " + member.getPassword());

        member.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        Authority authority = new Authority(AuthorityName.FREE_USER, signUpRequest.getEmail());

        memberService.save(member, authority);

        return new ResponseEntity(new ApiResponse(true, "User registered successfully"), HttpStatus.OK);
    }

}
