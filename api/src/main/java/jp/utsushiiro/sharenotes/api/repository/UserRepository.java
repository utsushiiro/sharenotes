package jp.utsushiiro.sharenotes.api.repository;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.error.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.repository.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    private final UserMapper userMapper;

    @Autowired
    public UserRepository(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public User findOne(int id) {
        User user = userMapper.findOne(id);
        if (user == null) {
            throw new ResourceNotFoundException(User.class, id);
        }
        return user;
    }

    public User findOneByUsername(String username) {
        User user = userMapper.findOneByUsername(username);
        if (user == null) {
            throw new ResourceNotFoundException(User.class, username);
        }
        return user;
    }

    public void insert(User user) {
        this.userMapper.insert(user);
    }

    public void update(User user) {
        int affectedNum = this.userMapper.update(user);
        if (affectedNum != 1) {
            throw new ResourceNotFoundException(User.class, user.getId());
        }
    }

    public void delete(int id) {
        int affectedNum = this.userMapper.delete(id);
        if (affectedNum != 1) {
            throw new ResourceNotFoundException(User.class, id);
        }
    }
}

