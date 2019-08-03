package jp.utsushiiro.sharenotes.api.exception.exceptions;

import org.springframework.http.HttpStatus;

public class UniqueConstraintViolationException extends ApplicationException {

    public UniqueConstraintViolationException(String message) {
       setMessage(message);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}
