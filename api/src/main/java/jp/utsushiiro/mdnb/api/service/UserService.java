package jp.utsushiiro.mdnb.api.service;

import jp.utsushiiro.mdnb.api.domain.User;
import jp.utsushiiro.mdnb.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findOne(int id) {
        return userRepository.findOne(id);
    }

    public User findOneByUsername(String username) {
        return userRepository.findOneByUsername(username);
    }

    public User create(User user) {
        userRepository.insert(user);
        return userRepository.findOne(user.getId());
    }

    public void update(User user) {
        userRepository.update(user);
    }

    public void delete(int id) {
        userRepository.delete(id);
    }
}
