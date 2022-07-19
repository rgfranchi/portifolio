package rgf.micro.manage.config.security;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.util.matcher.RequestMatcher;

/**
 * Recebe valores de autenticação da url da aplicação.
 */
public class UrlAuthFilterSecurity extends AbstractAuthFilterSecurity {

    public UrlAuthFilterSecurity(RequestMatcher requiresAuthenticationRequestMatcher) {
        super(requiresAuthenticationRequestMatcher);
    }

    @Override
    protected String getPassword(HttpServletRequest request) {
        System.out.println(request.getParameter("apiPassword"));
        return request.getParameter("apiPassword");
    }

    @Override
    protected String getUserName(HttpServletRequest request) {
        return request.getParameter("apiKey");
    }

}
