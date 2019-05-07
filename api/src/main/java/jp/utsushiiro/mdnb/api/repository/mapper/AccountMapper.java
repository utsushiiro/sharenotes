package jp.utsushiiro.mdnb.api.repository.mapper;

import jp.utsushiiro.mdnb.api.domain.Account;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface AccountMapper {
    Account findOne(int id);

    Account findOneByUsername(String username);

    void insert(Account note);

    int update(Account note);

    int delete(int id);
}
