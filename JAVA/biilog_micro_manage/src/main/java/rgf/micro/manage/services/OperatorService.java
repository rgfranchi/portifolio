package rgf.micro.manage.services;

import java.util.List;

import rgf.micro.manage.services.helper.DefaultCRUDService;
import rgf.micro.manage.model.OperatorDto;

public interface OperatorService extends DefaultCRUDService<OperatorDto> {
	List<OperatorDto> findByCompany(Long id);
}
