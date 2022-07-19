package rgf.micro.manage.model;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class QuestionDto {
    private Long id;

    @NotBlank(message = "O Questionário deve ter um nome")
    private String nome;

    private String jsonQuestion;

    @JsonProperty("ownerQuestions")
    @Valid
    private List<OwnerQuestionDto> ownerQuestionsDto;
}
