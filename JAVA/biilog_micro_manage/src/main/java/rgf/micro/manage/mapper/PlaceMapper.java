package rgf.micro.manage.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import rgf.micro.manage.domain.Places;
import rgf.micro.manage.model.PlaceDto;
import rgf.micro.manage.mapper.helper.CompanyHelperMapper;

@Mapper(uses = { CompanyHelperMapper.class })
public interface PlaceMapper {

    // Utiliza nome da variável no source
    @Mapping(source = "dto.companyId", target = "company")
    Places placeDtoToPlace(PlaceDto dto);

    // Utiliza nome da variável
    @Mapping(source = "domain.company", target = "companyId")
    PlaceDto placeToPlaceDto(Places domain);

}
