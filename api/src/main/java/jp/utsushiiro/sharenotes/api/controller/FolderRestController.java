package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.dto.form.FolderForm;
import jp.utsushiiro.sharenotes.api.dto.resource.FolderResource;
import jp.utsushiiro.sharenotes.api.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class FolderRestController {

    private final FolderService folderService;

    @Autowired
    public FolderRestController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/folders/{id}")
    public FolderResource find(
            @PathVariable Long id,
            @AuthenticationPrincipal(expression = "user") User user
    ) {
        return new FolderResource(folderService.findById(id), user);
    }

    @PostMapping("/folders")
    public FolderResource create(
            @RequestBody @Validated FolderForm folderForm,
            @AuthenticationPrincipal(expression = "user") User user
    ) {
        return new FolderResource(folderService.create(folderForm.getFolderNames(), user), user);
    }
}
