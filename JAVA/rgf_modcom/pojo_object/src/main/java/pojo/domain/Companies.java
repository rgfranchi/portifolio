package pojo.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

// import org.hibernate.validator.constraints.br.CNPJ;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Companies {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false, nullable = false)
	private Long id;

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

	private String nomeContato;

	@Email
	private String email;

	@NotBlank
	private String telefone1;

	private String telefone2;

	// @CNPJ erro ao compilar a biblioteca do javax.validation
	// @todo: (verificar como utilizar jakarta.validation)
	// https://mvnrepository.com/artifact/jakarta.validation/jakarta.validation-api/3.0.1
	private String cnpj;
}
