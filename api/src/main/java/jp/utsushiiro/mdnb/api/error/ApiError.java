package jp.utsushiiro.mdnb.api.error;

import lombok.Data;

@Data
class ApiError {
    private String message;

    ApiError(Exception ex) {
        setMessage(ex.getMessage());
    }

    ApiError(ApiException ex) {
        setMessage(ex.getMessage());
    }

    ApiError(String message) {
        setMessage(message);
    }
}
