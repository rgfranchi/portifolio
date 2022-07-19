package rgf.micro.manage.mapper.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rgf.micro.manage.domain.Transmissions;
import rgf.micro.manage.mapper.TransmissionMapper;
import rgf.micro.manage.model.TransmissionDto;
import rgf.micro.manage.repository.ModuleRepository;

@Component
public class TransmissionHelperMapper {
    @Autowired
    TransmissionMapper mapper;
    @Autowired
    ModuleRepository moduleRepository;

    public Transmissions asTransmission(TransmissionDto dto) {
        return mapper.transmissionDtoToTransmission(dto);
        // if (dto == null) {
        // return null;
        // }
        // Transmissions transmission = mapper.transmissionDtoToTransmission(dto);
        // if (dto.getId() != null) {
        // transmission.setModule(moduleRepository.findFirstByTransmissionId(dto.getModuleId()));
        // }
        // return transmission;
    }

    public TransmissionDto asTransmissionDto(Transmissions entity) {
        return mapper.transmissionToTransmissionDto(entity);
        // if (entity == null) {
        // return null;
        // }
        // TransmissionDto dto = mapper.transmissionToTransmissionDto(entity);
        // dto.setModuleId(entity.getModule().getId());
        // return dto;
    }

}
