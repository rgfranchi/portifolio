package rgf.micro.manage.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.model.CompanyDto;

class CompanyMapperTest {

    private CompanyMapper companyMapper = Mappers.getMapper(CompanyMapper.class);

    @Test
    void companyDtoToCompany() {
        Companies entity = companyMapper.companyDtoToCompany(CompanyDto.builder().nome("Empresa Bootstrap A1")
                .cnpj("07.717.737/0001-79").email("empresa@bootstrap.com").nomeContato("Contato Bootstrap").build());

        assertEquals("07.717.737/0001-79", entity.getCnpj());
        assertEquals("Empresa Bootstrap A1", entity.getNome());
        assertEquals("empresa@bootstrap.com", entity.getEmail());
        assertEquals("Contato Bootstrap", entity.getNomeContato());

    }

    @Test
    void companyToCompanyDto() {
        CompanyDto dto = companyMapper.companyToCompanyDto(Companies.builder().nome("Empresa Bootstrap A1")
                .cnpj("07.717.737/0001-79").email("empresa@bootstrap.com").nomeContato("Contato Bootstrap").build());

        assertEquals("07.717.737/0001-79", dto.getCnpj());
        assertEquals("Empresa Bootstrap A1", dto.getNome());
        assertEquals("empresa@bootstrap.com", dto.getEmail());
        assertEquals("Contato Bootstrap", dto.getNomeContato());

    }

}