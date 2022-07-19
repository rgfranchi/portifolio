package rgf.micro.manage.mapper;

import org.mapstruct.Mapper;
// import org.mapstruct.Mapping;
import org.mapstruct.Mapping;

import rgf.micro.manage.domain.Operators;
import rgf.micro.manage.model.OperatorDto;
import rgf.micro.manage.mapper.helper.CompanyHelperMapper;

@Mapper(uses = { CompanyHelperMapper.class })
public interface OperatorMapper {
	// Utiliza nome da variável no source
	@Mapping(source = "dto.companyId", target = "company")
	Operators operatorDtoToOperator(OperatorDto dto);

	// Utiliza nome da variável
	@Mapping(source = "domain.company", target = "companyId")
	OperatorDto operatorToOperatorDto(Operators domain);
}