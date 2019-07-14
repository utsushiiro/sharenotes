package jp.utsushiiro.sharenotes.api.dto.response;

import jp.utsushiiro.sharenotes.api.domain.User;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;

    private String name;

    private String email;

    public UserResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
    }
}
