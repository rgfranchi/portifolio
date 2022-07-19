package rgf.micro.manage.services;

import rgf.micro.manage.services.helper.DefaultCRUDService;

import java.util.List;

import rgf.micro.manage.model.QuestionDto;

public interface QuestionService extends DefaultCRUDService<QuestionDto> {
    List<QuestionDto> findByCompany(Long id);
}
