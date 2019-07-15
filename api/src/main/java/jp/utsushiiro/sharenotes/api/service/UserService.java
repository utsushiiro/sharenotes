package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import jp.utsushiiro.sharenotes.api.dto.form.SignUpForm;
import jp.utsushiiro.sharenotes.api.error.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.repository.UserGroupRepository;
import jp.utsushiiro.sharenotes.api.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
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

    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public User findByName(String name) {
        List<User> users = userRepository.findByName(name);
        if (users.isEmpty()) {
            throw new ResourceNotFoundException(User.class, name);
        }
        return users.get(0);
    }

    @Transactional
    public User create(SignUpForm signUpForm) {
        UserGroup selfGroup = new UserGroup();
        selfGroup.setName(UUID.randomUUID().toString());
        userGroupRepository.save(selfGroup);

        User user = new User();
        user.setName(signUpForm.getUsername());
        user.setEmail(signUpForm.getEmail());
        user.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
        user.setSelfGroup(selfGroup);
        userRepository.save(user);

        selfGroup.addUser(user);
        selfGroup.setName(String.format("__userId__%s", user.getId()));

        UserGroup everyOneGroup = userGroupRepository.findByName(UserGroup.EVERYONE_USER_GROUP_NAME);
        everyOneGroup.addUser(user);

        return user;
    }

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
