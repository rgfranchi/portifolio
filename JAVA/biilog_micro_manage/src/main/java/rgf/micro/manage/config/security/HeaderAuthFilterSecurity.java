package rgf.micro.manage.config.security;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.util.matcher.RequestMatcher;

/**
 * Recebe valores de autenticação do cabeçalho da aplicação. Substitui o basic
 * authentication
 */
public class HeaderAuthFilterSecurity extends AbstractAuthFilterSecurity {

    public HeaderAuthFilterSecurity(RequestMatcher requiresAuthenticationRequestMatcher) {
        super(requiresAuthenticationRequestMatcher);
    }

    protected String getUserName(HttpServletRequest request) {
        return request.getHeader("api-key");
    }

    protected String getPassword(HttpServletRequest request) {
        return request.getHeader("api-password");
    }

}
