package hnm.hnm.controller.email;

import hnm.hnm.config.JwtTokenUtil;
import hnm.hnm.domain.member.Member;
import hnm.hnm.service.email.EmailService;
import hnm.hnm.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class EmailController {

    final EmailService emailService;
    final MemberService memberService;
    final JwtTokenUtil jwtTokenUtil;
    @Value("${mailHost}") String host;

    @GetMapping("/mail/send")
    public void sendEmail(@RequestParam String email, @RequestParam String emailToken) throws MessagingException {

        String emailContent = getEmailContents(email, emailToken);
        emailService.sendMail(email,"[홍만중국어 이메일 인증]", emailContent);

    }

    @GetMapping("/mail/resend")
    public void resendEmail(@RequestParam String email) throws MessagingException {
        String newEmailToken = jwtTokenUtil.generateEmailToken(email);
        memberService.emailTokenReIssuance(email, newEmailToken);
        String emailContent = getEmailContents(email, newEmailToken);
        emailService.sendMail(email,"[홍만중국어 이메일 인증]", emailContent);
    }

    @GetMapping("/mail/certified")
    public void checkMail(HttpServletRequest request, HttpServletResponse response, Member member) throws IOException, ServletException {
        String notCertifiedMail = memberService.emailCertifiedCheck(member);

        if (notCertifiedMail != null) {
            memberService.emailCertifiedUpdate(member.getEmail());
            response.sendRedirect("http://" + host + ":8080/auth/mail/success");
        } else {
            String newEmailToken = jwtTokenUtil.generateEmailToken(member.getEmail());
            memberService.emailTokenReIssuance(member.getEmail(), newEmailToken);
            RequestDispatcher dispatcher = request.getRequestDispatcher("/auth/mail/failed");
            request.setAttribute("eToken", newEmailToken);
            request.setAttribute("email", member.getEmail());
            dispatcher.forward(request, response);

        }
    }


    @GetMapping("/mail/checkMailAuth")
    public Boolean checkMailAuth(@RequestParam String email) {
        return emailService.checkMailAuth(email);
    }

    public String getEmailContents(String email, String emailToken) {

        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "</head>" +
                "<body>" +
                " <div" +
                "	style=\"font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 400px; height: 600px; border-top: 4px solid #D14124; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\">" +
                "	<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\">" +
                "		<span style=\"font-size: 15px; margin: 0 0 10px 3px;\">홍만중국어</span><br />" +
                "		<span style=\"color: #D14124\">메일인증</span> 안내입니다." +
                "	</h1>\n" +
                "	<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\">" +
                email +
                "		님 안녕하세요.<br />" +
                "		홍만중국어에 가입해 주셔서 진심으로 감사드립니다.<br />" +
                "		아래 <b style=\"color: #D14124\">'메일 인증'</b> 버튼을 클릭하여 회원가입을 완료해 주세요.<br />" +
                "		감사합니다." +
                "	</p>" +
                "	<a style=\"color: #FFF; text-decoration: none; text-align: center;\"" +
                "	href=\"http://" + host + ":8080/mail/certified?email=" + email + "&emailToken=" + emailToken + "\">" +
                "		<p" +
                "			style=\"display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #D14124; line-height: 45px; vertical-align: middle; font-size: 16px;\">" +
                "			메일 인증</p>" +
                "	</a>" +
                "	<div style=\"border-top: 1px solid #DDD; padding: 5px;\"></div>" +
                " </div>" +
                "</body>" +
                "</html>";
    }
}
