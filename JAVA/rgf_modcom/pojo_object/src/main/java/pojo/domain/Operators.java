package pojo.domain;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Email;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
public class Operators {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false, nullable = false)
	private Long id;

	private String nome;

	private String codOperador;

	@Email
	private String email;

	/** @todo Incluir ENUM para sexo */
	private String sexo;

	/** @todo: Incluir ENUM para tipo */
	private String funcao;

	private LocalDate acessoDataInicial;

	private LocalDate acessoDataFinal;

	private String senha;

	private String rfid;

	private String digital;

	private Boolean deleted;

	private String observacao;

	@ManyToOne
	@JoinColumn(name = "companyId", nullable = false, foreignKey = @ForeignKey(name = "fk_company_operator"))
	private Companies company;

	@ManyToMany(mappedBy = "operators", cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH })
	private Set<Modules> modules;

	@CreationTimestamp
	@Column(updatable = false)
	private Timestamp created;

	@UpdateTimestamp
	private Timestamp updated;

}
