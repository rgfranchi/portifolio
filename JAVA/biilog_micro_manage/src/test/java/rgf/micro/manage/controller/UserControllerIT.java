package rgf.micro.manage.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

@WebMvcTest
public class UserControllerIT extends BaseIT {

    @Test
    void findAllUserHttpBasic() throws Exception {
        // envia usuário pelo header da aplicação.
        mockMvc.perform(get("/api/v0/user/findAll")).andExpect(status().is2xxSuccessful());
        // como verificar resposta rest:
        // https://github.com/springframeworkguru/ssc-brewery/blob/sec-unit-test/src/test/java/guru/sfg/brewery/web/controllers/BeerControllerIT.java
        // .andExpect(view().name("beers/findBeers"))
        // .andExpect(model().attributeExists("beer"));
    }

}
