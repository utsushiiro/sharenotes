package jp.utsushiiro.sharenotes.api.error.exceptions;

import jp.utsushiiro.sharenotes.api.error.ApiException;
import org.springframework.http.HttpStatus;

public class ForbiddenOperationException extends ApiException {
    public ForbiddenOperationException() {
        super("Forbidden operation detected");
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.FORBIDDEN;
    }
}
