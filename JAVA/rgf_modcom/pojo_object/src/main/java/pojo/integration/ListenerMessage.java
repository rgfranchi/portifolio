package pojo.integration;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListenerMessage {
    /**
     * Ação executada por esta regra.
     */
    @Builder.Default
    private TypeListenerMessage typeMessageListener = TypeListenerMessage.NOT_DEFINED;

    /**
     * Código do Modulo se localizado.
     */
    @Builder.Default
    private String codModulo = "DEFAULT_COD_MODULO";

    /**
     * 
     * String parametrizada de resposta.<br>
     * Executa Replace dos parâmetros de configuração<br>
     * Ex: _DATE_TIME_. => TESTO_A:_DATE_TIME_:TESTO_B => TESTO_A:2022-05-02
     * 10:20:59:TESTO_B<br>
     * Se 'NULL' não responde.
     */
    @Builder.Default
    private String messageResponse = null;

    /**
     * Texto de resposta.
     * Substituído pelo parâmetro _REPLAY_PAYLOAD_ de 'messageResponse'.
     */
    @Builder.Default
    private String replayPayload = "";

    /**
     * Resposta padrão quando não é encontrada resposta na fila do módulo.
     */
    @Builder.Default
    private String messageNotFound = null;

    /**
     * Resposta padrão quando encontrado erro na mensagem.
     */
    @Builder.Default
    private String messageError = null;


    /**
     * Expressão regular deve ser exata ou conter uma coincidência.
     */
    @Builder.Default
    private Boolean exact = false;

    /**
     * Grupo da expressão regular onde se encontra o código do módulo.
     * 
     * @todo: incluir restrição para o caso de envio para outro servidor.
     */
    @Builder.Default
    private Integer codModuleGroup = 0;

    /**
     * Realiza busca por informações (configuração) para o módulo.
     */
    @Builder.Default
    private Boolean findModule = false;

    /**
     * Numero de tentativas de confirmar o recebimento do mensagem. <br>
     * Se '0' (zero) não realiza confirmação <br>
     * Default = 0
     */
    @Builder.Default
    private Long confirmTimes = 0L;

    /**
     * Comprimento do uuid da reposta de confirmação do módulo <br>
     * Opção para economizar bytes no módulo.
     */
    @Builder.Default
    private Integer uuidLength = 0;

    /**
     * Comprimento do uuid da reposta de confirmação do módulo <br>
     * Opção para economizar bytes no módulo.
     */
    @Builder.Default
    private String uuidConfirm = "DEFAULT_UUID_CONFIRM";

    /**
     * Grupo da expressão regular onde se encontra o UUID de confirmação.
     */
    @Builder.Default
    private Integer uuidConfirmGroup = 0;

    /**
     * Adiciona ou subtrai horas coletadas pelo sistema.
     */
    @Builder.Default
    private Integer plusHour = 0;

    /**
     * Formata data hora
     * 
     * @todo incluir link das conversões.
     */
    @Builder.Default
    private String formatDateTime = "YYYY-MM-dd HH:mm:ss";

}
