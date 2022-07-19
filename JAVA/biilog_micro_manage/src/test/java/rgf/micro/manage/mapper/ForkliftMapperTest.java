package rgf.micro.manage.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.domain.Forklifts;
import rgf.micro.manage.domain.Modules;
import rgf.micro.manage.domain.Operators;
import rgf.micro.manage.domain.Places;
import rgf.micro.manage.model.ForkliftDto;
import rgf.micro.manage.model.ModuleDto;

@SpringBootTest
public class ForkliftMapperTest {

        @Autowired
        private ForkliftMapper mapper;

        @Test
        void forkliftDtoToForkliftTest() {
                List<Long> listOperatorId = new ArrayList<>();
                listOperatorId.add(1L);
                listOperatorId.add(2L);
                listOperatorId.add(7L);
                listOperatorId.add(4L);
                ModuleDto moduleDto = ModuleDto.builder().id(1L).codigo("99ABC").fabricante("BIILOG").companyId(1L)
                                .placeId(1L).listOperatorId(listOperatorId).build();

                Forklifts entity = mapper.forkliftDtoToForklift(ForkliftDto.builder().anoFabricacao("1998")
                                .codigo("ASD123").fabricante("Maquita").hodometroInicial(1234567890)
                                .horimetroInicial(987654321).modelo("Empilhadeira").module(moduleDto).build());

                assertEquals("Empilhadeira", entity.getModelo());
                assertEquals("ASD123", entity.getCodigo());
                assertEquals(1234567890, entity.getHodometroInicial());
                assertEquals(987654321, entity.getHorimetroInicial());
                assertEquals("99ABC", entity.getModule().getCodigo());
                assertEquals("99ABC", entity.getModule().getCodigo());
                assertEquals("-46.68348267", entity.getModule().getPlace().getLongitude().toString());
                assertEquals(3, entity.getModule().getOperators().size());

        }

        @Test
        void forkliftToForkliftDtoTest() {
                List<Operators> listOperators = new ArrayList<Operators>();

                listOperators.add(Operators.builder().id(11L).nome("TESTE 1").build());
                listOperators.add(Operators.builder().id(12L).nome("TESTE 2").build());
                listOperators.add(Operators.builder().id(13L).nome("TESTE 3").build());

                Modules module = Modules.builder().id(1L).codigo("99ABC").fabricante("BIILOG")
                                .place(Places.builder().id(3L).nome("TESTE DE LOCALIDADE")
                                                .logradouro("Rua Chaves .... ").latitude(new BigDecimal(12.34567535))
                                                .longitude(new BigDecimal(180.34567535)).build())
                                .company(Companies.builder().id(2L).nome("TESTE").build()).operators(listOperators)
                                .build();

                ForkliftDto dto = mapper.forkliftToForkliftDto(Forklifts.builder().id(99L).anoFabricacao("1998")
                                .codigo("ASD123").fabricante("Maquita").hodometroInicial(1234567890)
                                .horimetroInicial(987654321).modelo("Empilhadeira").module(module).build());

                assertEquals("Maquita", dto.getFabricante());
                assertEquals("ASD123", dto.getCodigo());
                assertEquals("1998", dto.getAnoFabricacao());
                assertEquals(987654321, dto.getHorimetroInicial());
                assertEquals(99L, dto.getId());
                assertEquals(1L, dto.getModule().getId());
                assertEquals(3, dto.getModule().getListOperatorId().size());

        }

}
