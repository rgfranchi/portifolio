package rgf.micro.manage.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.time.Month;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.domain.Operators;
import rgf.micro.manage.model.OperatorDto;

@SpringBootTest
class OperatorMapperTest {

    @Autowired
    private OperatorMapper mapper;// = Mappers.getMapper(OperatorMapper.class);

    @Test
    void operatorDtoToOperator() {
        Operators entity = mapper.operatorDtoToOperator(
                OperatorDto.builder().id(2L).nome("Teste 2").codOperador("222").senha("Senha 222").rfid("RF 222")
                        .funcao("Supervisor").sexo("Feminino").acessoDataInicial(LocalDate.of(2021, Month.JANUARY, 11))
                        .acessoDataFinal(LocalDate.of(2021, Month.JANUARY, 11)).email("teste2@com.br")
                        .observacao("Isto é um teste").companyId(2L).build());

        assertEquals("Teste 2", entity.getNome());
        assertEquals("222", entity.getCodOperador());
        assertEquals("Senha 222", entity.getSenha());
        assertEquals("WINE", entity.getCompany().getNome());
        assertEquals("2021-01-11", entity.getAcessoDataInicial().toString());

    }

    @Test
    void operatorToOperatorDto() {
        OperatorDto dto = mapper.operatorToOperatorDto(Operators.builder().nome("Teste 2").codOperador("222")
                .acessoDataInicial(LocalDate.of(2021, Month.JANUARY, 11))
                .company(Companies.builder().id(2L).nome("TESTE").build()).build());

        assertEquals("Teste 2", dto.getNome());
        assertEquals("222", dto.getCodOperador());
        assertEquals("2021-01-11", dto.getAcessoDataInicial().toString());
        assertEquals(2L, dto.getCompanyId());
    }

}