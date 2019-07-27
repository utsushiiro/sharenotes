package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import jp.utsushiiro.sharenotes.api.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserGroupService {
    private final UserGroupRepository userGroupRepository;

    @Autowired
    public UserGroupService(UserGroupRepository userGroupRepository) {
        this.userGroupRepository = userGroupRepository;
    }

    @Transactional
    public UserGroup create(String userGroupName) {
        UserGroup userGroup = new UserGroup();
        userGroup.setName(userGroupName);
        userGroupRepository.save(userGroup);
        return userGroup;
    }

    @Transactional(readOnly = true)
    public boolean exists(UserGroup userGroup) {
        Example<UserGroup> userGroupExample = Example.of(userGroup);
        return userGroupRepository.exists(userGroupExample);
    }
}
