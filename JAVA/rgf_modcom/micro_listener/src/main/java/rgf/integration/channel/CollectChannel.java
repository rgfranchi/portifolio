package rgf.integration.channel;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.annotation.Transformer;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
// import rgf.integration.domain.RuleMessage;
import pojo.integration.RuleMessage;
import rgf.integration.service.JsonService;
import rgf.integration.service.RegexService;

/**
 * Classe para realizar operações genérias nas mensagens.<br>
 * Incia processo, Limpa, define o tipo ...
 */
@Slf4j
@Service
public class CollectChannel {

    private String fileJsonRules = "default_rules";

    @Autowired
    private JsonService jsonService;

    @Autowired
    private RegexService regexService;

    /**
     * Recebe mensagem para processamento<br>
     * Inclui regra padrão da mensagem.<br>
     * Encaminha para o proximo passo, clear.
     * 
     * @param message objeto Mensagem que será processado.
     */
    @Transformer(inputChannel = "channel.collect.process", outputChannel = "channel.collect.clear")
    public Message<String> process(Message<String> message) {
        log.info("#################################################################################");
        log.info(">>> Receive process: {}", message.getPayload());
        return message;
    }

    /**
     * Realiza a limpeza de caracteres indesejados da mensagem<br>
     * 1-Substitui caracteres "\n" e "\r" por " "<br>
     * 2-Retira espaços iniciais e finais.
     * 
     * @param message
     * @return
     */
    @Transformer(inputChannel = "channel.collect.clear", outputChannel = "channel.collect.type")
    public Message<String> clean(Message<String> message) {
        String messageClean = message.getPayload().toString().replaceAll("\n", " ").replaceAll("\r", " ").trim();
        log.info(">>> Receive clean: {}", messageClean);
        return MessageBuilder
                .withPayload(messageClean)
                .copyHeaders(message.getHeaders()).build();
    }

    /**
     * Identifica a regra da mensagem e o tipo de mensagem
     * Atualiza no header (cabeçalho) da mensagem as regras da mensagem que foi
     * recebida.<br>
     * Utiliza Regex para validar a mensagem dentro da regra.<br>
     * -> message.route (config/RouteConfig) destino da mensagem.
     * 
     * @todo CRIAR LOOP PARA Verificar regras (carregar regras de arquivo).
     * @param message
     * @return
     * @throws MessagingException
     * @throws IOException
     */
    @Transformer(inputChannel = "channel.collect.type", outputChannel = "config.route.typeMessage")
    public Message<String> type(Message<String> message) throws MessagingException {
        String new_message = message.getPayload();
        // carrega regras.
        List<RuleMessage> listRules = null;
        try {
            listRules = jsonService.rulesFile(fileJsonRules);
        } catch (IOException e) {
            log.error("FAIL TO OPEN JSON RULES {}", e.getMessage());
            e.printStackTrace();
        }
        // realiza interação até localizar regra.
        Iterator<RuleMessage> iteratorRules = listRules.iterator();
        RuleMessage ruleMessage = RuleMessage.builder().build();
        do {
            RuleMessage nextRule = iteratorRules.next();
            regexService.regexPatter(nextRule.getRegex());

            if ((!nextRule.getListenerMessage().getExact() && regexService.lookingAt(new_message))
                    || (nextRule.getListenerMessage().getExact() && regexService.matches(new_message))) {
                ruleMessage = nextRule;
            }
        } while (iteratorRules.hasNext() && (ruleMessage.getName() == "DEFAULT_RULE"));

        log.info(">>> Receive type: {}", ruleMessage.getListenerMessage().getTypeMessageListener().toString());

        return MessageBuilder.withPayload(new_message).copyHeaders(message.getHeaders())
                .setHeader("typeMessage", ruleMessage.getListenerMessage().getTypeMessageListener().toString())
                .setHeader("ruleMessage", ruleMessage)
                .build();
    }
}
