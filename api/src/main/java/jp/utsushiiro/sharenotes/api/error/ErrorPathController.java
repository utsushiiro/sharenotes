package jp.utsushiiro.sharenotes.api.error;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

@RestController
public class ErrorPathController implements ErrorController {

    @RequestMapping("/error")
    public ResponseEntity<Object> handleError(HttpServletRequest request) {
        Exception exception = (Exception) request.getAttribute(RequestDispatcher.ERROR_EXCEPTION);
        Integer statusCode = (Integer) request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

        HttpStatus status = HttpStatus.valueOf(statusCode);

        // replace an undefined status code with 500
        // TODO log undefined status code
        if (status == null) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        String message;
        if (exception != null) {
            message = exception.getMessage();

            // TODO use logger
            exception.printStackTrace();
        } else {
            message = status.getReasonPhrase();
        }

        return new ResponseEntity<>(new ApiError(message), null, status);
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
