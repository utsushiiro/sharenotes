package jp.utsushiiro.sharenotes.api.exception.exceptions;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends ApplicationException {
    public ResourceNotFoundException(Class clazz, Object identifier) {
        setMessage(String.format("%s(identifier=%s) not found", clazz.getSimpleName(), identifier));
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }
}
