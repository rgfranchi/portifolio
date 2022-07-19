package rgf.micro.manage.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import rgf.micro.manage.domain.Modules;
import rgf.micro.manage.mapper.helper.CompanyHelperMapper;
import rgf.micro.manage.mapper.helper.OperatorHelperMapper;
import rgf.micro.manage.mapper.helper.PlaceHelperMapper;
import rgf.micro.manage.mapper.helper.TransmissionHelperMapper;
import rgf.micro.manage.model.ModuleDto;

@Mapper(uses = { CompanyHelperMapper.class, OperatorHelperMapper.class, PlaceHelperMapper.class,
		TransmissionHelperMapper.class })
public interface ModuleMapper {
	// Utiliza nome da variável no source
	@Mappings({ @Mapping(source = "dto.companyId", target = "company"),
			@Mapping(source = "dto.listOperatorId", target = "operators"),
			@Mapping(source = "dto.placeId", target = "place"),
			@Mapping(source = "dto.transmissionDto", target = "transmission") })
	Modules moduleDtoToModule(ModuleDto dto);

	// Utiliza nome da variável
	@Mappings({ @Mapping(source = "domain.company", target = "companyId"),
			@Mapping(source = "domain.operators", target = "listOperatorId"),
			@Mapping(source = "domain.place", target = "placeId"),
			@Mapping(source = "domain.transmission", target = "transmissionDto"), })
	ModuleDto moduleToModuleDto(Modules domain);
}
