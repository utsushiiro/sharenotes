package jp.utsushiiro.mdnb.api.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class User {
    private int id;

    private String name;

    private String password;

    private UserRole userRole;

    private LocalDateTime updatedAt;

    private LocalDateTime createdAt;
}