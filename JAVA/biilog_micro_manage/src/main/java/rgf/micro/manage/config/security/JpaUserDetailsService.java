package rgf.micro.manage.config.security;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import rgf.micro.manage.repository.UserRepository;

@Slf4j
@RequiredArgsConstructor
@Service
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Recebe informações do usuário JPA {}", username);

        return userRepository.findByEmail(username).orElseThrow(() -> {
            return new UsernameNotFoundException("Usuário não localizado:" + username);
        });

        // Users user = userRepository.findByEmail(username).orElseThrow(() -> {
        // return new UsernameNotFoundException("Usuário não localizado:" + username);
        // });
        // Classe de autorização.
        // return new User(user.getEmail(), user.getPassword(),
        // loadSpringAuthorities(user.getAuthorities()));
    }

    // private Collection<? extends GrantedAuthority>
    // loadSpringAuthorities(Set<Authorities> authorities) {
    // log.info("loadSpringAuthorities");

    // if (authorities != null && authorities.size() > 0) {
    // return
    // authorities.stream().map(Authorities::getPermission).map(SimpleGrantedAuthority::new)
    // .collect(Collectors.toSet());
    // } else {
    // return new HashSet<>();
    // }
    // }

}
