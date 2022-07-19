package rgf.micro.manage.services;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import rgf.micro.manage.model.ForkliftDto;

@ExtendWith(SpringExtension.class)
@SpringBootTest()
public class ForkliftServiceTest {
    @Autowired
    ForkliftService forkliftService;

    @Test
    void testFindByModuleId() {
        ForkliftDto dto = forkliftService.findByModuleId(2L);
        assertEquals(2L, dto.getId());
        assertEquals("97ABC_UPDATE", dto.getModule().getCodigo());
    }

}
