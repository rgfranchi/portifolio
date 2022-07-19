package rgf.micro.manage.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.domain.Groups;
import rgf.micro.manage.domain.Users;
import rgf.micro.manage.model.UserDto;

@SpringBootTest
class UserMapperTest {

    @Autowired
    private UserMapper mapper;// = Mappers.getMapper(OperatorMapper.class);

    @Test
    void userDtoToUsers() {
        Users entity = mapper.userDtoToUser(UserDto.builder().id(1L).nome("Administrador Geral").email("root@com.br")
                .password("cm9vdA==").companyId(1L).groupId(1L).build());

        assertEquals("Administrador Geral", entity.getNome());
        assertEquals("Root", entity.getGroup().getNome());
        assertEquals("BIILOG", entity.getCompany().getNome());

    }

    @Test
    void usersToUsersDto() {
        UserDto dto = mapper.userToUserDto(
                Users.builder().nome("USER TESTE").group(Groups.builder().id(7L).nome("TESTE_GRUPO").build())
                        .company(Companies.builder().id(2L).nome("TESTE").build()).build());

        assertEquals("USER TESTE", dto.getNome());
        assertEquals(2L, dto.getCompanyId());
        assertEquals(7L, dto.getGroupId());
    }

}