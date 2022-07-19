package rgf.micro.manage.model;

import java.io.Serializable;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto implements Serializable {

    private static final long serialVersionUID = -6127097042690966593L;

    private Long id;

    @Size(min = 3, max = 100, message = "Nome do usuário deve ter entre 3 e 100 caracteres")
    private String nome;

    @Email(message = "E-mail inválido")
    private String email;

    @Size(min = 8, message = "A Senha deve conter no minimo 8 caracteres")
    @Pattern(regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&|^~+=_-])[A-Za-z0-9@$!%*#?&|^~+=_-]*", message = "Obrigatório Uma Caixa Alta, Uma Caixa Baixa, Um numero e Um Caracter especial")
    private String password;

    @NotNull(message = "Código id do Grupo não pode ser nulo")
    private Long groupId;

    @NotNull(message = "Código id da Empresa não pode ser nulo")
    @Min(value = 1, message = "Código id da Empresa inválido")
    private Long companyId;

}