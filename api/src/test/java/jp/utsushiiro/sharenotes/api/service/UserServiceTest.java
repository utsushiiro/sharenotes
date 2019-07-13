package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Test
    void findByIdTest() {
        Long id = 1L;
        Optional<User> expected = Optional.of(new User());
        Mockito.doReturn(expected).when(userRepository).findById(id);

        Optional<User> result = userService.findById(id);

        assertThat(result).isEqualTo(expected);
        Mockito.verify(userRepository, Mockito.times(1)).findById(id);
    }

    @Test
    void findByNameTest() {
        String name = "test";
        User expected = new User();
        List<User> users = new ArrayList<>();
        users.add(expected);
        Mockito.doReturn(users).when(userRepository).findByName(name);

        User result = userService.findByName(name);

        assertThat(result).isEqualTo(expected);
        Mockito.verify(userRepository, Mockito.times(1)).findByName(name);
    }

    @Test
    void createTest() {
        User expected = new User();

        User result = userService.create(expected);

        assertThat(result).isEqualTo(expected);
        Mockito.verify(userRepository, Mockito.times(1)).save(expected);
    }


    @Test
    void updateTest() {
        User expected = new User();

        userService.update(expected);

        Mockito.verify(userRepository, Mockito.times(1)).save(expected);
    }

    @Test
    void deleteTest() {
        Long id = 1L;

        userService.delete(id);

        Mockito.verify(userRepository, Mockito.times(1)).deleteById(id);
    }

}
