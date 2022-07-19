package rgf.micro.manage.services;

import java.util.List;

import rgf.micro.manage.model.UserDto;

public interface UserService {
    Boolean create(UserDto dto);

    Boolean update(UserDto dto);

    List<UserDto> listAll();

    List<UserDto> findByCompany(Long id);

    UserDto findById(Long id);

    Boolean delete(Long id);
}
