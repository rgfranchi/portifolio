package rgf.micro.manage.mapper;

import org.mapstruct.Mapper;

import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.model.CompanyDto;

@Mapper
public interface CompanyMapper {
	Companies companyDtoToCompany(CompanyDto companyDto);

	CompanyDto companyToCompanyDto(Companies company);
}
