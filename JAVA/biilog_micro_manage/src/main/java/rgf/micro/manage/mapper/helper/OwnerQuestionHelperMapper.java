package rgf.micro.manage.mapper.helper;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rgf.micro.manage.domain.OwnerQuestions;
import rgf.micro.manage.domain.OwnerQuestions.OwnerQuestionsBuilder;
import rgf.micro.manage.model.OwnerQuestionDto;
import rgf.micro.manage.model.OwnerQuestionDto.OwnerQuestionDtoBuilder;
import rgf.micro.manage.repository.CompanyRepository;
import rgf.micro.manage.repository.ModuleRepository;

@Component
public class OwnerQuestionHelperMapper {

    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private ModuleRepository moduleRepository;

    public Set<OwnerQuestions> asOwnerQuestion(List<OwnerQuestionDto> listDto) {
        Set<OwnerQuestions> setEntity = new HashSet<OwnerQuestions>();
        listDto.forEach(dto -> {
            OwnerQuestionsBuilder entity = OwnerQuestions.builder();
            entity.id(dto.getId());
            entity.company(companyRepository.findById(dto.getCompanyId()).get());
            if (dto.getModuleId() != null) {
                entity.module(moduleRepository.findById(dto.getModuleId()).get());
            }
            setEntity.add(entity.build());
        });
        return setEntity;
    }

    public List<OwnerQuestionDto> asOwnerQuestionDto(Set<OwnerQuestions> entities) {
        List<OwnerQuestionDto> listOwnerQuestionDto = new ArrayList<OwnerQuestionDto>();
        entities.stream().forEach(entity -> {
            OwnerQuestionDtoBuilder ownerQuestionDto = OwnerQuestionDto.builder();
            ownerQuestionDto.id(entity.getId());
            ownerQuestionDto.companyId(entity.getCompany().getId());
            if (entity.getModule() != null) {
                ownerQuestionDto.moduleId(entity.getModule().getId());
            }
            listOwnerQuestionDto.add(ownerQuestionDto.build());
        });
        return listOwnerQuestionDto;
        // return ownerQuestionDto; INSERT INTO OWNER_QUESTION
        // ("ID","COMPANY_ID","QUESTION_ID")VALUES(5,3,1)
    }

}