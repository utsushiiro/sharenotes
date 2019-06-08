package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }

    public User findByName(String name) {
        return userRepository.findByName(name).get(0);
    }

    public User create(User user) {
        userRepository.save(user);
        return user;
    }

    public void update(User user) {
        userRepository.save(user);
    }

    public void delete(int id) {
        userRepository.deleteById(id);
    }
}
