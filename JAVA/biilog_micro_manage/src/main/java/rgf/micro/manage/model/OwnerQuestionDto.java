package rgf.micro.manage.model;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class OwnerQuestionDto {
    private Long id;

    @NotNull(message = "Codigo id da empresa não informado")
    private Long companyId;

    private Long moduleId;
}
