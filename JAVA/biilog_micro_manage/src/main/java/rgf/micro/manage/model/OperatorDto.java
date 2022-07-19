package rgf.micro.manage.model;

import java.io.Serializable;
import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OperatorDto implements Serializable {

	private static final long serialVersionUID = 2346091247663433250L;

	private Long id;

	@Size(min = 3, max = 100)
	private String nome;

	private String codOperador;

	@Email
	private String email;

	@NotNull
	private String sexo;

	private String funcao;

	private LocalDate acessoDataInicial;

	private LocalDate acessoDataFinal;

	private String senha;

	private String rfid;

	private String digital;

	private Boolean deleted;

	private String observacao;

	@NotNull(message = "Código id da Empresa não pode ser nulo")
	@Min(value = 1, message = "Código id da Empresa inválido")
	private Long companyId;
}
