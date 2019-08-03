package jp.utsushiiro.sharenotes.api.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import jp.utsushiiro.sharenotes.api.exception.exceptions.ApplicationException;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
class ExceptionResource {
    private String message;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Detail> details = new ArrayList<>();

    ExceptionResource(Exception ex) {
        setMessage(ex.getMessage());
    }

    ExceptionResource(ApplicationException ex) {
        setMessage(ex.getMessage());
    }

    ExceptionResource(String message) {
        setMessage(message);
    }

    @Data
    @AllArgsConstructor
    private class Detail {
        private String target;
        private String message;
    }

    public void addDetail(String target, String message) {
        details.add(this.new Detail(target, message));
    }
}
