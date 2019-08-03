package jp.utsushiiro.sharenotes.api.exception.exceptions;

import org.springframework.http.HttpStatus;

public class ForbiddenOperationException extends ApplicationException {
    public ForbiddenOperationException() {
        setMessage("Forbidden operation detected");
    }

    public ForbiddenOperationException(String message) {
        setMessage(message);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.FORBIDDEN;
    }
}
