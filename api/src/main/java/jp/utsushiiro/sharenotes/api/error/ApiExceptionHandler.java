package jp.utsushiiro.sharenotes.api.error;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * TODO use logger for stack traces
 */
@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleExceptionInternal(
            Exception ex,
            Object body,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request
    ) {
        ex.printStackTrace();
        return super.handleExceptionInternal(ex, new ApiError(ex), headers, status, request);
    }

    @ExceptionHandler
    public ResponseEntity<Object> handleApiException(
            ApiException ex,
            WebRequest request
    ) {
        ex.printStackTrace();
        return super.handleExceptionInternal(ex, new ApiError(ex), null, ex.getHttpStatus(), request);
    }

    @ExceptionHandler
    public ResponseEntity<Object> handleApiException(
            DataAccessException ex,
            WebRequest request
    ) {
        ex.printStackTrace();
        return super.handleExceptionInternal(ex, new ApiError(ex), null, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
}
