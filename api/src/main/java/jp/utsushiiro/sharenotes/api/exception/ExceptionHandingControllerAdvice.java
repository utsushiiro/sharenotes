package jp.utsushiiro.sharenotes.api.exception;

import jp.utsushiiro.sharenotes.api.exception.exceptions.ApplicationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * TODO use logger for stack traces
 */
@RestControllerAdvice
public class ExceptionHandingControllerAdvice extends ResponseEntityExceptionHandler {

    private final MessageSource messageSource;

    @Autowired
    public ExceptionHandingControllerAdvice(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(
            Exception ex,
            Object body,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request
    ) {
        ex.printStackTrace();

        if (body instanceof ExceptionResource) {
            return super.handleExceptionInternal(ex, ex, headers, status, request);
        }else {
            return super.handleExceptionInternal(ex, new ExceptionResource(ex), headers, status, request);
        }
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request
    ) {
        ExceptionResource exceptionResource = new ExceptionResource("Validation Error");
        BindingResult bindingResult = ex.getBindingResult();

        for (ObjectError error: bindingResult.getGlobalErrors()) {
            exceptionResource.addDetail(error.getObjectName(), messageSource.getMessage(error, request.getLocale()));
        }

        for (FieldError error: bindingResult.getFieldErrors()) {
            exceptionResource.addDetail(error.getField(), messageSource.getMessage(error, request.getLocale()));
        }

        return super.handleExceptionInternal(ex, exceptionResource, headers, status, request);
    }

    @ExceptionHandler
    public ResponseEntity<Object> handleApplicationException(
            ApplicationException ex,
            WebRequest request
    ) {
        ex.printStackTrace();
        return super.handleExceptionInternal(ex, new ExceptionResource(ex), null, ex.getHttpStatus(), request);
    }

    @ExceptionHandler
    public ResponseEntity<Object> handleDataAccessException(
            DataAccessException ex,
            WebRequest request
    ) {
        ex.printStackTrace();
        return super.handleExceptionInternal(ex, new ExceptionResource("Data Access Error"), null, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
}
