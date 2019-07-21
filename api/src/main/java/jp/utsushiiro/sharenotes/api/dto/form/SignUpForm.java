package jp.utsushiiro.sharenotes.api.dto.form;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

@Data
public class SignUpForm {
    @Pattern(
            regexp = "^[a-zA-Z][a-zA-Z0-9]+$",
            message = "Please input using half-width English numbers and letters, using more than 2 characters. " +
                      "The first letter can not be a number."
    )
    private String username;

    @Email(message = "Please input a well-formed email address.")
    private String email;

    @Pattern(
            regexp = "^[a-zA-Z0-9]{8,16}$",
            message = "Please input using half-width English numbers and letters, using more than 8 characters but less than 16."
    )
    private String password;
}
