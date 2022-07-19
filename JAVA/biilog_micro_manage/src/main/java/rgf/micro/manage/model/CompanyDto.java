package rgf.micro.manage.model;

import java.io.Serializable;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.br.CNPJ;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyDto implements Serializable {

	private static final long serialVersionUID = -8795095555686101656L;

	private Long id;

	@Size(min = 3, message = "Nome da empresa com no minimo de 3 caracteres")
	private String nome;

	// Mais conhecido por CEP;
	private String codPostal;

	private String pais;

	private String estado;

	private String cidade;

	private String bairro;

	private String logradouro;

	private String numero;

	private String complemento;

	@Size(min = 3, message = "Nome do Contato com no minimo de 3 caracteres")
	private String nomeContato;

	@Email
	private String email;

	private String telefone1;

	private String telefone2;

	@CNPJ(message = "Valor do CNPJ inválido")
	private String cnpj;

}
