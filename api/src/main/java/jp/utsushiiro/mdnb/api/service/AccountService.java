package jp.utsushiiro.mdnb.api.service;

import jp.utsushiiro.mdnb.api.domain.Account;
import jp.utsushiiro.mdnb.api.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account findOne(int id) {
        return accountRepository.findOne(id);
    }

    public Account findOneByUsername(String username) {
        return accountRepository.findOneByUsername(username);
    }

    public Account create(Account account) {
        accountRepository.insert(account);
        return accountRepository.findOne(account.getId());
    }

    public void update(Account account) {
        accountRepository.update(account);
    }

    public void delete(int id) {
        accountRepository.delete(id);
    }
}
