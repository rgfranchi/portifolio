package rgf.micro.manage.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Users;
import rgf.micro.manage.exceptions.DeleteCannotBeException;
import rgf.micro.manage.exceptions.DeleteNotFoundException;
import rgf.micro.manage.exceptions.UpdateNotFoundException;
import rgf.micro.manage.exceptions.GenericMessageException;
import rgf.micro.manage.exceptions.SaveDataException;
import rgf.micro.manage.mapper.UserMapper;
import rgf.micro.manage.model.UserDto;
import rgf.micro.manage.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository domainRepository;
    private final UserMapper domainMapper;

    @Override
    public Boolean create(UserDto dto) {
        try {
            if (dto.getPassword() == null) {
                throw new GenericMessageException("O valor do Password não pode ser nulo.");
            }
            Users entities = domainMapper.userDtoToUser(dto);
            domainRepository.save(entities);
        } catch (Exception e) {
            throw new SaveDataException(e.getMessage(), "User");
        }
        return true;
    }

    @Override
    public Boolean update(UserDto dto) {
        if (domainRepository.existsById(dto.getId())) {
            create(dto);
        } else {
            throw new UpdateNotFoundException(dto.getId(), "User");
        }
        return true;
    }

    @Override
    public List<UserDto> listAll() {
        List<UserDto> listDto = new ArrayList<>();
        domainRepository.findAll().forEach(each -> {
            listDto.add(domainMapper.userToUserDto(each));
        });
        return listDto;
    }

    @Override
    public List<UserDto> findByCompany(Long id) {
        List<UserDto> listDto = new ArrayList<>();
        domainRepository.findByCompanyId(id).forEach(each -> {
            listDto.add(domainMapper.userToUserDto(each));
        });
        return listDto;
    }

    @Override
    public UserDto findById(Long id) {
        Optional<Users> optionalDomain = domainRepository.findById(id);
        return domainMapper.userToUserDto(optionalDomain.orElse(null));
    }

    @Override
    public Boolean delete(Long id) {
        if (id == 1L) {
            throw new DeleteCannotBeException(id, "User");
        }
        if (domainRepository.existsById(id)) {
            domainRepository.deleteById(id);
        } else {
            throw new DeleteNotFoundException(id, "User");
        }
        return true;
    }

}
