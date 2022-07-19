package rgf.micro.manage.services;

import rgf.micro.manage.services.helper.DefaultCRUDService;

import java.util.List;

import rgf.micro.manage.model.CompanyDto;
import rgf.micro.manage.model.CompanySelectDto;

public interface CompanyService extends DefaultCRUDService<CompanyDto> {

    List<CompanySelectDto> listAllCompanySelectDto();

}
