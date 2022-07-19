package rgf.micro.manage.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Modules;
import rgf.micro.manage.exceptions.DeleteNotFoundException;
import rgf.micro.manage.exceptions.SaveDataException;
import rgf.micro.manage.exceptions.UpdateNotFoundException;
import rgf.micro.manage.mapper.ModuleMapper;
import rgf.micro.manage.model.ModuleDto;
import rgf.micro.manage.repository.ModuleRepository;

@RequiredArgsConstructor
@Service
public class ModuleServiceImpl implements ModuleService {

    private final ModuleRepository domainRepository;
    private final ModuleMapper domainMapper;

    @Override
    public Boolean create(ModuleDto dto) {
        try {
            Modules entity = domainMapper.moduleDtoToModule(dto);
            domainMapper.moduleToModuleDto(domainRepository.save(entity));
        } catch (Exception e) {
            throw new SaveDataException(e.getMessage(), "Module");
        }
        return true;
    }

    @Override
    public Boolean update(ModuleDto dto) {
        if (domainRepository.existsById(dto.getId())) {
            return create(dto);
        } else {
            throw new UpdateNotFoundException(dto.getId(), "Module");
        }
    }

    @Override
    public List<ModuleDto> listAll() {
        List<ModuleDto> listDto = new ArrayList<>();
        domainRepository.findAll().forEach(entity -> {
            listDto.add(domainMapper.moduleToModuleDto(entity));
        });
        return listDto;
    }

    @Override
    public ModuleDto findById(Long id) {
        Optional<Modules> entity = domainRepository.findById(id);
        return domainMapper.moduleToModuleDto(entity.orElse(null));

    }

    @Override
    public Boolean delete(Long id) {
        if (domainRepository.existsById(id)) {
            domainRepository.deleteById(id);
        } else {
            throw new DeleteNotFoundException(id, "Operador");
        }
        return true;
    }

}
