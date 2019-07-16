package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import jp.utsushiiro.sharenotes.api.dto.form.SignUpForm;
import jp.utsushiiro.sharenotes.api.repository.UserGroupRepository;
import jp.utsushiiro.sharenotes.api.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserGroupRepository userGroupRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Test
    void findByIdTest() {
        Long id = 1L;
        Optional<User> expected = Optional.of(new User());
        Mockito.doReturn(expected).when(userRepository).findById(id);

        User result = userService.findById(id);

        assertThat(result).isEqualTo(expected.get());
        Mockito.verify(userRepository, Mockito.times(1)).findById(id);
    }

    @Test
    void createTest() {
        SignUpForm signUpForm = new SignUpForm();
        signUpForm.setUsername("test-user");
        signUpForm.setEmail("test@example.com");

        UserGroup mockEveryoneGroup = Mockito.mock(UserGroup.class);
        Mockito.doReturn(mockEveryoneGroup).when(userGroupRepository).findByName(UserGroup.EVERYONE_USER_GROUP_NAME);

        User result = userService.create(signUpForm);

        assertThat(result.getName()).isEqualTo(signUpForm.getUsername());
        Mockito.verify(userGroupRepository, Mockito.times(1)).save(ArgumentMatchers.any(UserGroup.class));
        Mockito.verify(userRepository, Mockito.times(1)).save(ArgumentMatchers.any(User.class));
        Mockito.verify(mockEveryoneGroup, Mockito.times(1)).addUser(ArgumentMatchers.any(User.class));
    }

    @Test
    void deleteTest() {
        // setup
        Long id = 1L;

        User mockUser = Mockito.mock(User.class);
        Mockito.doReturn(Optional.of(mockUser)).when(userRepository).findById(id);

        UserGroup mockSelfGroup = Mockito.mock(UserGroup.class);
        Mockito.doReturn(mockSelfGroup).when(mockUser).getSelfGroup();

        UserGroup mockEveryoneGroup = Mockito.mock(UserGroup.class);
        Mockito.doReturn(mockEveryoneGroup).when(userGroupRepository).findByName(UserGroup.EVERYONE_USER_GROUP_NAME);

        // do
        userService.delete(id);

        // check
        Mockito.verify(mockSelfGroup, Mockito.times(1)).removeUser(mockUser);
        Mockito.verify(mockEveryoneGroup, Mockito.times(1)).removeUser(mockUser);
        Mockito.verify(userRepository, Mockito.times(1)).delete(mockUser);
        Mockito.verify(userGroupRepository, Mockito.times(1)).delete(mockSelfGroup);
    }

}
