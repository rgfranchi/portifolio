package rgf.micro.manage.mapper.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.repository.CompanyRepository;

@Component
public class CompanyHelperMapper {
    @Autowired
    CompanyRepository defaultRepository;

    public Long asCompanyId(Companies entity) {
        return entity.getId();
    }

    public Companies asCompany(Long dtoId) {
        return defaultRepository.findById(dtoId).orElse(null);
    }
}
