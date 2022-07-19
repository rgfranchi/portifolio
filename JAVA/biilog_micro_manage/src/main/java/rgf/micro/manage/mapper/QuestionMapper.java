package rgf.micro.manage.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import rgf.micro.manage.domain.Questions;
import rgf.micro.manage.mapper.helper.OwnerQuestionHelperMapper;
import rgf.micro.manage.model.QuestionDto;

@Mapper(uses = { OwnerQuestionHelperMapper.class })
public interface QuestionMapper {

    @Mapping(source = "dto.ownerQuestionsDto", target = "ownerQuestions")
    Questions questionDtoToQuestion(QuestionDto dto);

    @Mapping(source = "domain.ownerQuestions", target = "ownerQuestionsDto")
    QuestionDto questionToQuestionDto(Questions domain);
}
