package rgf.micro.manage.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModuleDto implements Serializable {

    private static final long serialVersionUID = -5371292767375942145L;

    private Long id;

    private String codigo;

    private String modelo;

    private String versao;

    private String fabricante;

    private Boolean ativo;

    private String observacoes;

    private Long companyId;

    private List<Long> listOperatorId;

    @JsonProperty("transmission")
    private TransmissionDto transmissionDto;

    // @Positive
    // @NotNull(message = "O Modulo deve ser associado a um Local.")
    private Long placeId;

}
