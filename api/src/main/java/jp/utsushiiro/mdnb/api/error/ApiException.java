package jp.utsushiiro.mdnb.api.error;

import org.springframework.http.HttpStatus;

public abstract class ApiException extends RuntimeException{
    public abstract HttpStatus getHttpStatus();

    public ApiException(String message) {
        super(message);
    }
}
