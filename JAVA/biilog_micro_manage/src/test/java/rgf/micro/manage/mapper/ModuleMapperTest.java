package rgf.micro.manage.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.domain.Modules;
import rgf.micro.manage.domain.Operators;
import rgf.micro.manage.domain.Places;
import rgf.micro.manage.model.ModuleDto;

@SpringBootTest
class ModuleMapperTest {

    @Autowired
    private ModuleMapper mapper;// = Mappers.getMapper(OperatorMapper.class);

    @Test
    void moduleDtoToModuleTest() {
        List<Long> listOperatorId = new ArrayList<Long>();
        listOperatorId.add(1L);
        listOperatorId.add(2L);
        listOperatorId.add(7L);
        listOperatorId.add(4L);
        Modules entity = mapper.moduleDtoToModule(ModuleDto.builder().id(1L).codigo("99ABC").fabricante("BIILOG")
                .companyId(1L).placeId(1L).listOperatorId(listOperatorId).build());

        assertEquals("BIILOG", entity.getFabricante());
        assertEquals("99ABC", entity.getCodigo());
        assertNotNull(entity.getOperators());
        assertEquals(3, entity.getOperators().size());
        assertEquals("-23.60362371", entity.getPlace().getLatitude().toString());
        assertEquals("-46.68348267", entity.getPlace().getLongitude().toString());

    }

    @Test
    void moduleToModuleDtoTest() {

        List<Operators> listOperators = new ArrayList<Operators>();

        listOperators.add(Operators.builder().id(11L).nome("TESTE 1").build());
        listOperators.add(Operators.builder().id(12L).nome("TESTE 2").build());
        listOperators.add(Operators.builder().id(13L).nome("TESTE 3").build());

        ModuleDto dto = mapper.moduleToModuleDto(Modules.builder().id(1L).codigo("99ABC").fabricante("BIILOG")
                .place(Places.builder().id(3L).nome("TESTE DE LOCALIDADE").logradouro("Rua Chaves .... ")
                        .latitude(new BigDecimal(12.34567535)).longitude(new BigDecimal(180.34567535)).build())
                .company(Companies.builder().id(2L).nome("TESTE").build()).operators(listOperators).build());

        assertEquals("BIILOG", dto.getFabricante());
        assertEquals("99ABC", dto.getCodigo());
        assertEquals(2L, dto.getCompanyId());
        assertEquals(3, dto.getListOperatorId().size());
        assertEquals(3L, dto.getPlaceId());
    }

}