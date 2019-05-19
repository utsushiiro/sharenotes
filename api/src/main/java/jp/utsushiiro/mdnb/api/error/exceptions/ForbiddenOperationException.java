package jp.utsushiiro.mdnb.api.error.exceptions;

import jp.utsushiiro.mdnb.api.error.ApiException;
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
