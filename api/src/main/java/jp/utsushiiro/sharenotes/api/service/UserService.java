package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import jp.utsushiiro.sharenotes.api.error.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.repository.UserGroupRepository;
import jp.utsushiiro.sharenotes.api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final UserGroupRepository userGroupRepository;

    public UserService(
            UserRepository userRepository,
            UserGroupRepository userGroupRepository
    ) {
        this.userRepository = userRepository;
        this.userGroupRepository = userGroupRepository;
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
    public User create(User user) {
        userRepository.save(user);

        UserGroup selfGroup = new UserGroup();
        selfGroup.setName(String.format("__userId__%s", user.getId()));
        selfGroup.addUser(user);
        userGroupRepository.save(selfGroup);

        UserGroup everyOneGroup = userGroupRepository.findByName("__everyone").get(0);
        everyOneGroup.addUser(user);

        return user;
    }

    @Transactional
    public void update(User user) {
        userRepository.save(user);
    }

    @Transactional
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
