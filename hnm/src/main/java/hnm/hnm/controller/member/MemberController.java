package hnm.hnm.controller.member;

import hnm.hnm.config.JwtTokenUtil;
import hnm.hnm.config.Token;
import hnm.hnm.domain.member.*;
import hnm.hnm.service.email.EmailService;
import hnm.hnm.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class MemberController {

    final AuthenticationManager authenticationManager;
    final PasswordEncoder passwordEncoder;
    final JwtTokenUtil jwtTokenUtil;
    final MemberService memberService;
    final EmailService emailService;
    final HttpSession httpSession;

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);

    @GetMapping("/hello")
    public String helloController() {
        System.out.println("say hello");
        return "test hello is successful";
    }

    @PostMapping("/auth/signIn")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) throws Exception {

        System.out.println("loginRequest: " + loginRequest.getSnsType());

        if (!(loginRequest.getSnsType().equals(""))) {
            if (!(memberService.checkExistingEmail(loginRequest.getEmail()))) {
                SignUpRequest signUpRequest = new SignUpRequest(loginRequest.getEmail(), loginRequest.getPassword(), loginRequest.getSnsType());
                registerUser(signUpRequest);
            }
        }

        Authentication authenticate = authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        SecurityContextHolder.getContext().setAuthentication(authenticate);

        MemberPrincipal memberPrincipal = (MemberPrincipal) authenticate.getPrincipal();

        Long memberId = memberPrincipal.getMemberId();
        Token jwt = jwtTokenUtil.makeToken(memberId);
        Boolean checkEmailAuth = emailService.checkMailAuth(loginRequest.getEmail());

        memberService.saveRefreshToken(memberId, jwt.getRefreshToken());

        return ResponseEntity.ok(new JwtResponse(jwt.getToken(), checkEmailAuth, memberId));
    }

    private Authentication authenticate(String email, String password) throws Exception {

        try {
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @GetMapping("/auth/token/refresh")
    public ApiResponse refreshToken(@RequestParam String memberId) {
        Long id = Long.parseLong(memberId);
        String token = memberService.getRefreshToken(id);
        if (jwtTokenUtil.validateToken(token)) {
            Token jwt = jwtTokenUtil.makeToken(id);
            memberService.saveRefreshToken(id, jwt.getRefreshToken());
            System.out.println("new jwt token: " + jwt.getToken());
            return new ApiResponse(true, jwt.getToken());
        } else {
            return new ApiResponse(false, "expired refresh token");
        }
    }

    @PostMapping("/auth/signUp")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        if (memberService.checkExistingEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false, "Duplicate account"),
                    HttpStatus.OK);
        }

        Authority authority = new Authority(AuthorityName.FREE_USER);

        String emailToken;
        String snsType;
        if (signUpRequest.getOauth().equals("false")) {
            emailToken = jwtTokenUtil.generateEmailToken(signUpRequest.getEmail());
            snsType = "";
        } else {
            emailToken = "Y";
            snsType = signUpRequest.getOauth();
        }

        String password = passwordEncoder.encode(signUpRequest.getPassword());
        Member member = new Member(signUpRequest.getEmail(), password, emailToken, snsType,
                true, true, true, true);
        memberService.save(member, authority);
        return new ResponseEntity(new ApiResponse(true, emailToken), HttpStatus.OK);

//        String emailToken = jwtTokenUtil.generateEmailToken(signUpRequest.getEmail());
//
//
//        Member member = new Member(signUpRequest.getEmail(), signUpRequest.getPassword(), emailToken,
//                true, true, true, true);
//
//        member.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
//
//        Authority authority = new Authority(AuthorityName.FREE_USER);
//
//        memberService.save(member, authority);
//
//        return new ResponseEntity(new ApiResponse(true, emailToken), HttpStatus.OK);
    }
}
