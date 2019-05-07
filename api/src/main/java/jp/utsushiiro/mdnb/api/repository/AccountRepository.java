package jp.utsushiiro.mdnb.api.repository;

import jp.utsushiiro.mdnb.api.domain.Account;
import jp.utsushiiro.mdnb.api.error.exceptions.ResourceNotFoundException;
import jp.utsushiiro.mdnb.api.repository.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AccountRepository {
    private final AccountMapper accountMapper;

    @Autowired
    public AccountRepository(AccountMapper accountMapper) {
        this.accountMapper = accountMapper;
    }

    public Account findOne(int id) {
        Account account = accountMapper.findOne(id);
        if (account == null) {
            throw new ResourceNotFoundException(Account.class, id);
        }
        return account;
    }

    public Account findOneByUsername(String username) {
        Account account = accountMapper.findOneByUsername(username);
        if (account == null) {
            throw new ResourceNotFoundException(Account.class, username);
        }
        return account;
    }

    public void insert(Account account) {
        this.accountMapper.insert(account);
    }

    public void update(Account account) {
        int affectedNum = this.accountMapper.update(account);
        if (affectedNum != 1) {
            throw new ResourceNotFoundException(Account.class, account.getId());
        }
    }

    public void delete(int id) {
        int affectedNum = this.accountMapper.delete(id);
        if (affectedNum != 1) {
            throw new ResourceNotFoundException(Account.class, id);
        }
    }
}

