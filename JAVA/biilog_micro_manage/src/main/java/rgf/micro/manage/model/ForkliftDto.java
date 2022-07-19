package rgf.micro.manage.model;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ForkliftDto implements Serializable {

    private static final long serialVersionUID = 4446441182909153149L;

    private Long id;

    private String codigo;

    private String fabricante;

    private String modelo;

    private String motor;

    private String anoFabricacao;

    private Integer horimetroInicial;

    private Integer hodometroInicial;

    @NotNull(message = "A Empilhadeira deve ser associada a um modulo.")
    private ModuleDto module;
}
