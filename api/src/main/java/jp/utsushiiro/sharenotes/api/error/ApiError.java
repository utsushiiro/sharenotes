package jp.utsushiiro.sharenotes.api.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
class ApiError {
    private String message;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Detail> details = new ArrayList<>();

    ApiError(Exception ex) {
        setMessage(ex.getMessage());
    }

    ApiError(ApiException ex) {
        setMessage(ex.getMessage());
    }

    ApiError(String message) {
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
