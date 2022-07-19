package pojo.integration;

import java.io.Serializable;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IntegrationMessage implements Serializable {
    static final long serialVersionUID = -6703829570277352447L;
    private UUID uuid;
    // private String codModulo;
    
    /**
     * Mensagem que será consumida pelo módulo.
     */
    @Builder.Default
    private String message = null;
    
    /**
     * String de seleção da mensagem;
     * @todo : atual cod_modulo, alterar para  cod_modulo.ownerModel.ownerId
     */
    @Builder.Default
    private String messageSelector = null;

    @Builder.Default
    RuleMessage ruleMessage = RuleMessage.builder().build();
}
