package jp.utsushiiro.sharenotes.api.auth;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.dto.resource.UserResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthenticationSuccessHandlerImpl implements AuthenticationSuccessHandler {
    private MappingJackson2HttpMessageConverter httpMessageConverter;

    @Autowired
    public AuthenticationSuccessHandlerImpl(MappingJackson2HttpMessageConverter httpMessageConverter) {
        this.httpMessageConverter = httpMessageConverter;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        SpringSecurityUser springSecurityUser = (SpringSecurityUser) authentication.getPrincipal();
        User user = springSecurityUser.getUser();
        HttpOutputMessage outputMessage = new ServletServerHttpResponse(response);
        httpMessageConverter.write(new UserResource(user), MediaType.APPLICATION_JSON_UTF8, outputMessage);
        response.setStatus(HttpStatus.OK.value());
    }
}
