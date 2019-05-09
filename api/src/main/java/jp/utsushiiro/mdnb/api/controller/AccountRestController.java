package jp.utsushiiro.mdnb.api.controller;

import jp.utsushiiro.mdnb.api.domain.Account;
import jp.utsushiiro.mdnb.api.domain.AccountRole;
import jp.utsushiiro.mdnb.api.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts/")
public class AccountRestController {
    private final AccountService accountService;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public AccountRestController(AccountService accountService, PasswordEncoder passwordEncoder) {
        this.accountService = accountService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping(path = "/{id}")
    public Account findOne(@PathVariable int id) {
        return this.accountService.findOne(id);
    }

    @PostMapping(path = "")
    public Account create(@RequestBody Account account) {
        account.setAccountRole(AccountRole.USER);
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return this.accountService.create(account);
    }

    @PatchMapping(path = "/{id}")
    public void update(@RequestBody Account account, @PathVariable int id) {
        account.setId(id);
        account.setAccountRole(AccountRole.USER);
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        this.accountService.update(account);
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable int id) {
        this.accountService.delete(id);
    }
}
