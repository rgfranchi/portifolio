package rgf.micro.manage.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Users;
import rgf.micro.manage.model.LoginCompanyDto;
import rgf.micro.manage.model.LoginDto;
import rgf.micro.manage.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class LoginServiceImpl implements LoginService {

    private final UserRepository userRepository;

    @Override
    public LoginDto authentication(String email, String password) {
        Optional<Users> optionalUser = userRepository.findByEmailAndPassword(email, password);
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            LoginCompanyDto company = LoginCompanyDto.builder().id(user.getCompany().getId())
                    .nome(user.getCompany().getNome()).build();

            LoginDto login = LoginDto.builder().userId(user.getId()).group(user.getGroup()).company(company).build();
            return login;
        }
        return null;
    }

}
