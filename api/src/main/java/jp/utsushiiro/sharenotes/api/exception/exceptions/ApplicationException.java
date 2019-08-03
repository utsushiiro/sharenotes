package jp.utsushiiro.sharenotes.api.exception.exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public abstract class ApplicationException extends RuntimeException{

    private String message = "API Exception";

    public ApplicationException() {}

    public abstract HttpStatus getHttpStatus();
}
