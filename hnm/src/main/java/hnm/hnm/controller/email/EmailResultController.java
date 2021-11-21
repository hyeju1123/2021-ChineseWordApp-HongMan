package hnm.hnm.controller.email;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class EmailResultController {

    @GetMapping("/auth/mail/success")
    public String getMailAuthSuccess() {
        return "successEmailAuth";
    }

    @GetMapping("/auth/mail/failed")
    public String getMailAuthFailed(HttpServletRequest request, Model model) {

        String newEmailToken = (String) request.getAttribute("eToken");
        String email = (String) request.getAttribute("email");

        model.addAttribute("email", email);
        model.addAttribute("emailToken", newEmailToken);

        return "failedEmailAuth";
    }
}
