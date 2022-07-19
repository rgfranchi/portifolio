package rgf.micro.manage.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import rgf.micro.manage.config.security.HeaderAuthFilterSecurity;
import rgf.micro.manage.config.security.PasswordEncoderSecurity;
import rgf.micro.manage.config.security.UrlAuthFilterSecurity;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    public HeaderAuthFilterSecurity headerAuthFilterSecurity(AuthenticationManager authenticationManager) {
        HeaderAuthFilterSecurity filter = new HeaderAuthFilterSecurity(new AntPathRequestMatcher("/api/v0/**"));
        filter.setAuthenticationManager(authenticationManager);
        return filter;
    }

    public UrlAuthFilterSecurity urlAuthFilterSecurity(AuthenticationManager authenticationManager) {
        UrlAuthFilterSecurity filter = new UrlAuthFilterSecurity(new AntPathRequestMatcher("/api/v0/**"));
        filter.setAuthenticationManager(authenticationManager);
        return filter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.addFilterBefore(headerAuthFilterSecurity(authenticationManager()),
                UsernamePasswordAuthenticationFilter.class).csrf().disable();

        http.addFilterBefore(urlAuthFilterSecurity(authenticationManager()),
                UsernamePasswordAuthenticationFilter.class);

        http.authorizeRequests(authorized -> {
            // verificar como implementar o login deixar permitido para todos.
            authorized.antMatchers("/h2-console/**").permitAll() // H2 - console, não utilizar em produção.
                    .antMatchers("/api/v0/index").permitAll()
                    // Role ROOT.
                    // .antMatchers("/api/v0/company/findAllCompanySelect").hasRole("ROOT")
                    // .antMatchers("/api/v0/company/findById/{id}").hasAnyRole("BASIC", "ROOT")
                    // .antMatchers(HttpMethod.GET, "/api/v0/user/**").permitAll(); // Autoriza tudo
                    // de usuário
                    .antMatchers(HttpMethod.GET, "/api/v0/user/findById/{id}").permitAll(); // Autoriza busca de usuário
                                                                                            // pelo ID
        }).authorizeRequests().anyRequest().authenticated().and().formLogin().and().httpBasic();

        // h2-console config
        http.headers().frameOptions().sameOrigin();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        // Seção 6
        return PasswordEncoderSecurity.createDelegatingPasswordEncoder();
        // return PasswordEncoderFactories.createDelegatingPasswordEncoder(); //
        // funciona com vário encode.
        // return new BCryptPasswordEncoder();
    }

    // Substituído pelo JpaUserDetailsService
    // @Override
    // protected void configure(AuthenticationManagerBuilder auth) throws Exception
    // {
    // // sem o método password encode utilizar "{noop}password"
    // auth.inMemoryAuthentication().withUser("root")
    // .password("{bcrypt}$2a$10$NGn89s8lHDggnxnLIxchK.P9xWDx8mFLqwM49JXtoy6HWCaZcfu2O").roles("ADMIN").and()
    // .withUser("user")
    // .password("{sha256}8aa342907ef43e4590b2cc6ac3394adf4f7d1b0438ca3333a6d28e1a70831a2e705624b27e264e5d")
    // .roles("USER");

    // auth.inMemoryAuthentication().withUser("username")
    // .password("{bcrypt15}$2a$15$IGP0P8Hzj7Om.vvr0mEgDeIltWZXQE2p.yUmMTAWHpvWvCkp/Rpr2").roles("CUSTOMER");
    // }

    // @Override
    // @Bean
    // protected UserDetailsService userDetailsService() {

    // UserDetails admin =
    // User.withDefaultPasswordEncoder().username("root").password("password").roles("ADMIN")
    // .build();

    // UserDetails user =
    // User.withDefaultPasswordEncoder().username("user").password("1234").roles("USER").build();

    // return new InMemoryUserDetailsManager(admin, user);
    // }

}
