package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.dto.form.FolderForm;
import jp.utsushiiro.sharenotes.api.dto.resource.FolderResource;
import jp.utsushiiro.sharenotes.api.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class FolderController {

    private final FolderService folderService;

    @Autowired
    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @PostMapping("/folders")
    public FolderResource create(
            @RequestBody @Validated FolderForm folderForm,
            @AuthenticationPrincipal(expression = "user") User user
    ) {
        return new FolderResource(folderService.create(folderForm.getFolderNames(), user));
    }
}
