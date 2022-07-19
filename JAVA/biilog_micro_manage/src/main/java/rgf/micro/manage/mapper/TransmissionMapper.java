package rgf.micro.manage.mapper;

import org.mapstruct.Mapper;

import rgf.micro.manage.domain.Transmissions;
import rgf.micro.manage.model.TransmissionDto;

@Mapper
public interface TransmissionMapper {

    Transmissions transmissionDtoToTransmission(TransmissionDto dto);

    TransmissionDto transmissionToTransmissionDto(Transmissions domain);

}
