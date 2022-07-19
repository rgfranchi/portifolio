package rgf.micro.manage.services;

import rgf.micro.manage.model.ForkliftDto;
import rgf.micro.manage.services.helper.DefaultCRUDService;

public interface ForkliftService extends DefaultCRUDService<ForkliftDto> {
    ForkliftDto findByModuleId(Long moduleId);
}
