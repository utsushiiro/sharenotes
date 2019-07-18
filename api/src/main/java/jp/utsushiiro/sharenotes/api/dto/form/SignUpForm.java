package jp.utsushiiro.sharenotes.api.dto.form;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

@Data
public class SignUpForm {
    @Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9]+$")
    private String username;

    @Email
    private String email;

    @Pattern(regexp = "^[a-zA-Z0-9]{8,16}$")
    private String password;
}
