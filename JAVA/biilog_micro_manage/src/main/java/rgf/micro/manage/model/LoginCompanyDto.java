package rgf.micro.manage.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginCompanyDto implements Serializable {
    private static final long serialVersionUID = 6394553651459508689L;

    private Long id;

    private String nome;
}