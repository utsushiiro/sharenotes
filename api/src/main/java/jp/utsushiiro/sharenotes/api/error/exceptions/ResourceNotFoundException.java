package jp.utsushiiro.sharenotes.api.error.exceptions;

import jp.utsushiiro.sharenotes.api.error.ApiException;
import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends ApiException {
    public ResourceNotFoundException(Class clazz, Object identifier) {
        super(String.format("%s(identifier=%s) not found", clazz.getSimpleName(), identifier));
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }
}
