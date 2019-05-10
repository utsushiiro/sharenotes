package jp.utsushiiro.mdnb.api.repository.mapper;

import jp.utsushiiro.mdnb.api.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface UserMapper {
    User findOne(int id);

    User findOneByUsername(String username);

    void insert(User note);

    int update(User note);

    int delete(int id);
}
