package rgf.micro.manage.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import rgf.micro.manage.domain.Users;
import rgf.micro.manage.mapper.helper.CompanyHelperMapper;
import rgf.micro.manage.mapper.helper.GroupHelperMapper;
import rgf.micro.manage.model.UserDto;

@Mapper(uses = { CompanyHelperMapper.class, GroupHelperMapper.class })
public interface UserMapper {
        @Mappings({ @Mapping(source = "dto.companyId", target = "company"),
                        @Mapping(source = "dto.groupId", target = "group") })
        Users userDtoToUser(UserDto dto);

        @Mappings({ @Mapping(source = "domain.company", target = "companyId"),
                        @Mapping(source = "domain.group", target = "groupId") })
        UserDto userToUserDto(Users domain);
}
