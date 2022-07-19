package rgf.micro.manage.mapper;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.domain.Modules;
import rgf.micro.manage.domain.OwnerQuestions;
import rgf.micro.manage.domain.Questions;
import rgf.micro.manage.model.OwnerQuestionDto;
import rgf.micro.manage.model.QuestionDto;

// import rgf.micro.manage.mapper.QuestionMapper;

@SpringBootTest
class QuestionMapperTest {

        @Autowired
        private QuestionMapper mapper;

        @Test
        void createQuestionDtoToQuestion() {
                String nome = "NOME DO QUESTIONáRIO";
                String jsonQuestion = "[{text:'Pergunta 1?', type:'boolean'},{text:'Pergunta 2?', type:'boolean'},{text:'Pergunta 3?', type:'boolean'}]";

                List<OwnerQuestionDto> listOwnerQuestionDto = new ArrayList<OwnerQuestionDto>();

                listOwnerQuestionDto.add(OwnerQuestionDto.builder().companyId(1L).moduleId(1L).build());
                listOwnerQuestionDto.add(OwnerQuestionDto.builder().companyId(3L).moduleId(2L).build());

                Questions entity = mapper.questionDtoToQuestion(QuestionDto.builder().nome(nome)
                                .jsonQuestion(jsonQuestion).ownerQuestionsDto(listOwnerQuestionDto).build());

                assertAll(() -> assertNull(entity.getId()), () -> assertEquals(nome, entity.getNome()),
                                () -> assertEquals(jsonQuestion, entity.getJsonQuestion()));

                // compara para validar teste.
                List<OwnerQuestions> listOwnerQuestion = entity.getOwnerQuestions().stream()
                                .sorted((e1, e2) -> e1.getModule().getId().compareTo(e2.getModule().getId()))
                                .collect(Collectors.toList());
                assertNull(listOwnerQuestion.get(0).getQuestion());
                assertEquals(1l, listOwnerQuestion.get(0).getCompany().getId());
                assertEquals(1l, listOwnerQuestion.get(0).getModule().getId());

                assertNull(listOwnerQuestion.get(1).getQuestion());
                assertEquals(3l, listOwnerQuestion.get(1).getCompany().getId());
                assertEquals(2l, listOwnerQuestion.get(1).getModule().getId());
        }

        @Test
        void readQuestionToQuestionDto() {
                String nome = "NOME DO QUESTIONáRIO";
                String jsonQuestion = "[{text:'Pergunta 1?', type:'boolean'},{text:'Pergunta 2?', type:'boolean'},{text:'Pergunta 3?', type:'boolean'}]";

                Set<OwnerQuestions> setOwnerQuestion = new HashSet<OwnerQuestions>();

                setOwnerQuestion.add(OwnerQuestions.builder().id(1L).company(Companies.builder().id(2L).build())
                                .question(Questions.builder().id(2L).build()).module(Modules.builder().id(2L).build())
                                .build());

                setOwnerQuestion.add(OwnerQuestions.builder().id(2L).company(Companies.builder().id(2L).build())
                                .question(Questions.builder().id(2L).build()).module(Modules.builder().id(3L).build())
                                .build());

                QuestionDto dto = mapper.questionToQuestionDto(Questions.builder().id(1L).nome(nome)
                                .jsonQuestion(jsonQuestion).ownerQuestions(setOwnerQuestion).build());

                assertAll(() -> assertEquals(1L, dto.getId()), () -> assertEquals(nome, dto.getNome()),
                                () -> assertEquals(jsonQuestion, dto.getJsonQuestion()));

                // ordena e compara para validar teste.
                List<OwnerQuestionDto> listOwnerQuestionDto = dto.getOwnerQuestionsDto().stream()
                                .sorted((e1, e2) -> e1.getModuleId().compareTo(e2.getModuleId()))
                                .collect(Collectors.toList());

                assertEquals(1l, listOwnerQuestionDto.get(0).getId());
                assertEquals(2l, listOwnerQuestionDto.get(0).getCompanyId());
                assertEquals(2l, listOwnerQuestionDto.get(0).getModuleId());

                assertEquals(2l, listOwnerQuestionDto.get(1).getId());
                assertEquals(2l, listOwnerQuestionDto.get(1).getCompanyId());
                assertEquals(3l, listOwnerQuestionDto.get(1).getModuleId());
        }

}
