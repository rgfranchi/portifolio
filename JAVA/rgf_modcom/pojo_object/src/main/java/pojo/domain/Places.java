package pojo.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
public class Places {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false, nullable = false)
	private Long id;

	private String nome;
	// Mais conhecido por CEP;
	private String codPostal;

	private String pais;

	private String cidade;

	private String bairro;

	private String logradouro;

	private String numero;

	private String complemento;

	@Column(precision = 10, scale = 8)
	private BigDecimal latitude;

	@Column(precision = 11, scale = 8)
	private BigDecimal longitude;

	private String cercaVirtual;

	private String observacao;

	@ManyToOne
	@JoinColumn(name = "companyId", nullable = false, foreignKey = @ForeignKey(name = "fk_company_place"))
	private Companies company;

}

/*
 * https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=
 * pt Sugestões para a formatação das coordenadas Seguem-se algumas sugestões
 * para formatar as suas coordenadas, de modo a que funcionem no Google Maps:
 * Utilize o símbolo de graus em vez de "d". Aplique pontos para casas decimais
 * e não vírgulas. Incorreto: 41,40338, 2,17403. Correto: 41.40338, 2.17403.
 * Indique as coordenadas de latitude antes das coordenadas de longitude.
 * Verifique se o primeiro número na coordenada de latitude está entre -90 e 90.
 * Verifique se o primeiro número na coordenada de longitude está entre -180 e
 * 180.
 */
