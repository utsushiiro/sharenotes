package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import jp.utsushiiro.sharenotes.api.error.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.repository.UserGroupRepository;
import jp.utsushiiro.sharenotes.api.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final UserGroupRepository userGroupRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            UserGroupRepository userGroupRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.userGroupRepository = userGroupRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PreAuthorize("isAuthenticated() and hasPermission(#id, 'jp.utsushiiro.sharenotes.api.domain.User', T(jp.utsushiiro.sharenotes.api.domain.User$AuthorityType).READ)")
    @Transactional(readOnly = true)
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(User.class, id));
    }

    @Transactional
    public User create(String username, String email, String password) {
        UserGroup selfGroup = new UserGroup();
        selfGroup.setName(UUID.randomUUID().toString());
        userGroupRepository.save(selfGroup);

        User user = new User();
        user.setName(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setSelfGroup(selfGroup);
        userRepository.save(user);

        selfGroup.addUser(user);
        selfGroup.setName(String.format("__userId__%s", user.getId()));

        UserGroup everyOneGroup = userGroupRepository.findByName(UserGroup.EVERYONE_USER_GROUP_NAME);
        everyOneGroup.addUser(user);

        return user;
    }

    @PreAuthorize("isAuthenticated() and hasPermission(#id, 'jp.utsushiiro.sharenotes.api.domain.User', T(jp.utsushiiro.sharenotes.api.domain.User$AuthorityType).ADMIN)")
    @Transactional
    public void delete(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(User.class, id));

        UserGroup selfGroup = user.getSelfGroup();
        selfGroup.removeUser(user);

        UserGroup everyOneGroup = userGroupRepository.findByName(UserGroup.EVERYONE_USER_GROUP_NAME);
        everyOneGroup.removeUser(user);

        userRepository.delete(user);
        userGroupRepository.delete(selfGroup);
    }
}
