package rgf.micro.manage.controller;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;

// @WebMvcTest
@SpringBootTest // alterado pois o @WebMvcTest não carrega JPA.
public class CompanyControllerIT extends BaseIT {

        @Disabled
        @WithMockUser("spring") // exemplo teste utilizando usuário mock
        @Test
        void findAllCompany() throws Exception {
                mockMvc.perform(get("/api/v0/company/findAll")).andExpect(status().is2xxSuccessful());
                // como verificar resposta rest:
                // https://github.com/springframeworkguru/ssc-brewery/blob/sec-unit-test/src/test/java/guru/sfg/brewery/web/controllers/BeerControllerIT.java
                // .andExpect(view().name("beers/findBeers"))
                // .andExpect(model().attributeExists("beer"));
        }

        @Test
        void findAllCompanyHttpBasic() throws Exception {
                // envia usuário pelo header da aplicação.
                mockMvc.perform(get("/api/v0/company/findAll").with(httpBasic("teste@teste.com", "teste")))
                                .andExpect(status().is2xxSuccessful());

                mockMvc.perform(get("/api/v0/company/findAll").with(httpBasic("guerra@biilog.com", "root")))
                                .andExpect(status().is2xxSuccessful());

                mockMvc.perform(get("/api/v0/company/findAll").with(httpBasic("cnhi@adm.com", "adm")))
                                .andExpect(status().is2xxSuccessful());
        }

        @Test
        void findAllCompanyHttpBasicBadRequest() throws Exception {
                // envia usuário pelo header da aplicação.
                mockMvc.perform(get("/api/v0/company/findAll").with(httpBasic("teste@teste.com", "testes")))
                                .andExpect(status().isUnauthorized());

                mockMvc.perform(get("/api/v0/company/findAll").with(httpBasic("guerra@biilog.com", "root")))
                                .andExpect(status().is2xxSuccessful());

                mockMvc.perform(get("/api/v0/company/findAll").with(httpBasic("cnhi@adm.com", "adm")))
                                .andExpect(status().is2xxSuccessful());
        }

        @Test
        void findAllCompanyHttpBasicForbidden() throws Exception {
                // Forbidden
                mockMvc.perform(get("/api/v0/company/findDropdown").with(httpBasic("teste@teste.com", "teste")))
                                .andExpect(status().isForbidden());
                // Success
                mockMvc.perform(get("/api/v0/company/findDropdown").with(httpBasic("guerra@biilog.com", "root")))
                                .andExpect(status().is2xxSuccessful());
                // Forbidden
                mockMvc.perform(get("/api/v0/company/findDropdown").with(httpBasic("cnhi@adm.com", "adm")))
                                .andExpect(status().isForbidden());
        }

        @Test
        void findByIdCompany() throws Exception {
                // envia usuário pelo header da aplicação.
                mockMvc.perform(get("/api/v0/company/findById/1").with(httpBasic("teste@teste.com", "teste")))
                                .andExpect(status().is2xxSuccessful());
        }

        @Test
        void deleteCompany() throws Exception {
                // envia usuário pelo header da aplicação.
                mockMvc.perform(delete("/api/v0/company/5").header("api-key", "teste@teste.com").header("api-password",
                                "teste")).andExpect(status().isOk());

        }

        @Test
        void deleteCompanyUrlFilter() throws Exception {
                // envia usuário pelo header da aplicação.
                mockMvc.perform(delete("/api/v0/company/5").param("apiKey", "teste@teste.com").param("apiPassword",
                                "teste")).andExpect(status().isOk());

        }

}
