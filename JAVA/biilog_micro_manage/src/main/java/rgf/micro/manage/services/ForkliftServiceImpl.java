package rgf.micro.manage.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Forklifts;
import rgf.micro.manage.domain.Transmissions;
import rgf.micro.manage.exceptions.SaveDataException;
import rgf.micro.manage.exceptions.DeleteNotFoundException;
import rgf.micro.manage.exceptions.UpdateNotFoundException;
import rgf.micro.manage.mapper.ForkliftMapper;
import rgf.micro.manage.model.ForkliftDto;
import rgf.micro.manage.repository.ForkliftRepository;

@RequiredArgsConstructor
@Service
public class ForkliftServiceImpl implements ForkliftService {

    private final ForkliftRepository domainRepository;
    private final ForkliftMapper domainMapper;

    @Override
    public Boolean create(ForkliftDto dto) {
        try {
            Forklifts entity = domainMapper.forkliftDtoToForklift(dto);
            Transmissions transmission = entity.getModule().getTransmission();
            if (transmission != null) {
                if (transmission.getId() == null) {
                    transmission.setId(entity.getModule().getId());
                }
                entity.getModule().getTransmission().setModule(entity.getModule());
            }
            domainMapper.forkliftToForkliftDto(domainRepository.save(entity));
        } catch (Exception e) {
            throw new SaveDataException(e.getMessage(), "Forklift");
        }
        return true;
    }

    @Override
    public Boolean update(ForkliftDto dto) {
        if (domainRepository.existsById(dto.getId())) {
            create(dto);
        } else {
            throw new UpdateNotFoundException(dto.getId(), "Forklift");
        }
        return true;
    }

    @Override
    public List<ForkliftDto> listAll() {
        List<ForkliftDto> listDto = new ArrayList<>();
        domainRepository.findAll().forEach(entity -> {
            listDto.add(domainMapper.forkliftToForkliftDto(entity));
        });
        return listDto;
    }

    @Override
    public ForkliftDto findById(Long id) {
        Optional<Forklifts> entity = domainRepository.findById(id);
        return domainMapper.forkliftToForkliftDto(entity.orElse(null));
    }

    @Override
    public Boolean delete(Long id) {
        if (domainRepository.existsById(id)) {
            domainRepository.deleteById(id);
        } else {
            throw new DeleteNotFoundException(id, "Empilhadeira");
        }
        return true;
    }

    @Override
    public ForkliftDto findByModuleId(Long moduleId) {
        Optional<Forklifts> entity = domainRepository.findFirstByModuleId(moduleId);
        return domainMapper.forkliftToForkliftDto(entity.orElse(null));
    }

}
