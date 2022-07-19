package rgf.micro.manage.services;

import rgf.micro.manage.model.LoginDto;

public interface LoginService {
    LoginDto authentication(String email, String password);
}
