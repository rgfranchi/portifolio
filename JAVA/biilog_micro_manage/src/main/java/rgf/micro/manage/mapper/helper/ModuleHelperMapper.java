package rgf.micro.manage.mapper.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rgf.micro.manage.domain.Modules;
import rgf.micro.manage.mapper.ModuleMapper;
import rgf.micro.manage.model.ModuleDto;

/**
 * Componente utilizado para carregar o modulo nas tabelas de relacionamento 1
 * para 1.
 */
@Component
public class ModuleHelperMapper {
    @Autowired
    ModuleMapper moduleMapper;

    public ModuleDto asModuleDto(Modules domain) {
        return moduleMapper.moduleToModuleDto(domain);
    }

    public Modules asModules(ModuleDto dto) {
        return moduleMapper.moduleDtoToModule(dto);
    }
}
