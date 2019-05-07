package jp.utsushiiro.mdnb.api.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Account {
    private int id;

    private String username;

    private String password;

    private AccountRole accountRole;

    private LocalDateTime updatedAt;

    private LocalDateTime createdAt;
}