package rgf.micro.manage.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import rgf.micro.manage.model.LoginDto;

@ExtendWith(SpringExtension.class)
@SpringBootTest()
public class LoginServiceTest {

    @Autowired
    LoginService loginService;

    @Disabled
    @Test
    void testAuthentication_OK() {
        LoginDto login = loginService.authentication("root@com.br", "cm9vdA==");
        assertEquals(1, login.getUserId());
        assertEquals("Empresa Bootstrap A1", login.getCompany().getNome());
        assertEquals("Root", login.getGroup().getNome());
    }

    @Test
    void testAuthentication_FAIL() {
        LoginDto login = loginService.authentication("fail@user.br", "cm9vdA==");
        assertNull(login);
    }

}
