package rgf.micro.manage.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import rgf.micro.manage.domain.Groups;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginDto implements Serializable {

    private static final long serialVersionUID = 6394553651459508687L;

    private Long userId;

    private LoginCompanyDto company;

    private Groups group;
}