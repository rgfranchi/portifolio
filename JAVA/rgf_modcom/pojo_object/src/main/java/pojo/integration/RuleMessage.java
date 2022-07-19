package pojo.integration;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * NoArgsConstructor e AllArgsConstructor<br>
 * Acrescentado para utilizar com o 'com.fasterxml.jackson'
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RuleMessage {
    /**
     * Nome da regra
     */
    @Builder.Default
    private String name = "DEFAULT_RULE";
    /**
     * Versão da regra.
     */
    @Builder.Default
    private String version = "0.0.0";

    /**
     * Model do proprietário da regra (Sistema Manager).<br>
     * Deve constar um valor para identificar o destino.
     */
    @Builder.Default
    private String ownerModel = "";

    /**
     * Id do proprietário da regra.<br>
     * Deve constar um valor para identificar o destino.
     */
    @Builder.Default
    private String ownerId = "";

    /**
     * Expressão Regular da regra.
     */
    @Builder.Default
    private String regex = "";

    @Builder.Default
    private String exception = null;

    /**
     * Regras de recebimento da mensagem no Listener.
     */
    @Builder.Default
    private ListenerMessage listenerMessage = ListenerMessage.builder().build();
}