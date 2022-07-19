package rgf.micro.manage.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import rgf.micro.manage.domain.Forklifts;
import rgf.micro.manage.mapper.helper.ModuleHelperMapper;
import rgf.micro.manage.model.ForkliftDto;

@Mapper(uses = { ModuleHelperMapper.class })
public interface ForkliftMapper {

    @Mapping(source = "dto.module", target = "module")
    Forklifts forkliftDtoToForklift(ForkliftDto dto);

    @Mapping(source = "domain.module", target = "module")
    ForkliftDto forkliftToForkliftDto(Forklifts domain);
}