package rgf.micro.manage.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceDto implements Serializable {

    private static final long serialVersionUID = 7890992990799159150L;

    private Long id;

    @NotBlank(message = "A localização deve ter um nome")
	private String nome;
	// Mais conhecido por CEP;
	private String codPostal;

	private String pais;

	private String cidade;

	private String bairro;

	private String logradouro;

	private String numero;

	private String complemento;

    @Min(-90)
    @Max(90)
    private BigDecimal latitude;

    @Min(-180)
    @Max(180)
    private BigDecimal longitude;

    private String cercaVirtual;

    private String observacao;

    private Long companyId;
}
