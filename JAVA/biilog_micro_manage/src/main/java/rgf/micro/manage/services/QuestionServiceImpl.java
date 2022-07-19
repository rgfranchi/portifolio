package rgf.micro.manage.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Questions;
import rgf.micro.manage.exceptions.DeleteNotFoundException;
import rgf.micro.manage.exceptions.SaveDataException;
import rgf.micro.manage.exceptions.UpdateNotFoundException;
import rgf.micro.manage.mapper.QuestionMapper;
import rgf.micro.manage.model.QuestionDto;
import rgf.micro.manage.repository.QuestionRepository;

@RequiredArgsConstructor
@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository domainRepository;
    private final QuestionMapper domainMapper;
    private String entityName = "Question";

    @Override
    public Boolean create(QuestionDto dto) {
        try {
            Questions question = domainMapper.questionDtoToQuestion(dto);
            question.getOwnerQuestions().forEach(ownerQuestion -> {
                ownerQuestion.setQuestion(question);
            });
            domainRepository.save(question);
        } catch (Exception e) {
            throw new SaveDataException(e.getMessage(), entityName);
        }
        return true;
    }

    @Override
    public Boolean update(QuestionDto dto) {
        if (domainRepository.existsById(dto.getId())) {
            return create(dto);
        } else {
            throw new UpdateNotFoundException(dto.getId(), entityName);
        }
    }

    @Override
    public List<QuestionDto> listAll() {
        List<QuestionDto> listDto = new ArrayList<>();
        domainRepository.findAll().forEach(entity -> {
            listDto.add(domainMapper.questionToQuestionDto(entity));
        });
        return listDto;
    }

    @Override
    public List<QuestionDto> findByCompany(Long id) {

        // criar agrupamento e recuperar pela question.

        List<QuestionDto> listDto = new ArrayList<>();
        domainRepository.findAllQuestionsByCompanyId(id).forEach(each -> {
            listDto.add(domainMapper.questionToQuestionDto(each));
        });
        return listDto;
    }

    @Override
    public QuestionDto findById(Long id) {
        Optional<Questions> entity = domainRepository.findById(id);
        return domainMapper.questionToQuestionDto(entity.orElse(null));
    }

    @Override
    public Boolean delete(Long id) {
        if (domainRepository.existsById(id)) {
            domainRepository.deleteById(id);
        } else {
            throw new DeleteNotFoundException(id, entityName);
        }
        return true;
    }

}
