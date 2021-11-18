package hnm.hnm.controller.member;

import hnm.hnm.config.JwtRequestFilter;
import hnm.hnm.config.JwtTokenUtil;
import hnm.hnm.config.Token;
import hnm.hnm.domain.member.*;
import hnm.hnm.exception.DiscrepancyRefreshTokenException;
import hnm.hnm.exception.InvalidAuthInputException;
import hnm.hnm.exception.InvalidTokenException;
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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

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
//        Token jwt = jwtTokenUtil.makeToken(memberId);
        String email = memberPrincipal.getEmail();
        Token jwt  = jwtTokenUtil.generateToken(email);
        Boolean checkEmailAuth = emailService.checkMailAuth(loginRequest.getEmail());

        memberService.saveRefreshToken(memberId, jwt.getRefreshToken());

        return ResponseEntity.ok(new JwtResponse(jwt, checkEmailAuth, memberId));
    }

    private Authentication authenticate(String email, String password) {

        try {
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (BadCredentialsException e) {
//            throw new Exception("INVALID_CREDENTIALS", e);
            throw new InvalidAuthInputException();
        }
    }

    /**
     * makeToken -> generateToken 으로 바꾸기
     * react 에서 request 로 memberId 말고 email 받는 거로 바꾸기
     * refresh token 발급 후 securityContext 어떻게 설정하는 지 알아보기
     */
//    @GetMapping("/auth/token/refresh")
//    public ApiResponse refreshToken(HttpServletRequest request) {
//        // Long id = Long.parseLong(memberId);
//        Long id = Long.parseLong(request.getParameter("memberId"));
//        String token = memberService.getRefreshToken(id);
//        if (jwtTokenUtil.validateToken(token, request)) {
//            Token jwt = jwtTokenUtil.makeToken(id);
//            memberService.saveRefreshToken(id, jwt.getRefreshToken());
//            System.out.println("new jwt token: " + jwt.getToken());
//            return new ApiResponse(true, jwt.getToken());
//        } else {
//            return new ApiResponse(false, "expired refresh token");
//        }
//    }
    @PostMapping("/auth/token/refresh")
    public Token refreshToken(HttpServletRequest request, @RequestBody Token token) {


        if (!jwtTokenUtil.validateToken(token.getRefreshToken(), request)) {
            /*
            refresh token 까지 만료된 상황이라면 로그인을 다시해야함.
            */
//            return new ApiResponse(false, "expired refresh token");
            throw new InvalidTokenException();
        }

//        String accessToken = request.getParameter("accessToken");
        Long id = Long.parseLong(request.getParameter("memberId"));
//        Member member = memberService.getRefreshTokenAndEmail(id);
        String refreshToken = memberService.getRefreshToken(id);
//        String email = member.getEmail();


        if (!refreshToken.equals(token.getRefreshToken())) {
//            return new ApiResponse(false, "User information discrepancy");
            throw new DiscrepancyRefreshTokenException();
        }

        String email = jwtTokenUtil.getEmailFromJWT(refreshToken);
        Token jwt  = jwtTokenUtil.generateToken(email);
        memberService.saveRefreshToken(id, jwt.getRefreshToken());
        return jwt;
    }


    @PostMapping("/auth/signUp")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody SignUpRequest signUpRequest) {
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
        return new ResponseEntity<>(new ApiResponse(true, emailToken), HttpStatus.OK);

    }
}
