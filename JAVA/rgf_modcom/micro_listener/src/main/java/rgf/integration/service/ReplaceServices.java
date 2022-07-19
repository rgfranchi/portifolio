package rgf.integration.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;
import pojo.integration.ListenerMessage;

// import rgf.integration.domain.ListenerMessage;

@Service
public class ReplaceServices {

    /**
     * Executa todas as opções de Replace para o texto.<br>
     * 
     * @param text texto com tags de replace.
     * @param vars Map com valores a serem substituído.
     * @return texto substituído.
     */
    public String verifyReplaces(ListenerMessage listenerMessage, String payload) {
        String text = listenerMessage.getMessageResponse();
        String tmp_message = text;
        if (tmp_message.trim().equals("") || tmp_message == null) {
            return "";
        }

        if (tmp_message.contains("_DATE_TIME_"))
            text = dateTime(text, listenerMessage);
        if (tmp_message.contains("_COD_MODULO_"))
            text = codModulo(text, listenerMessage);
        if (tmp_message.contains("_UUID_CONFIRM_"))
            text = uuidConfirm(text, listenerMessage);
        if (tmp_message.contains("_SEND_PAYLOAD_"))
            text = payloadConfirm(text, payload);
        if (tmp_message.contains("_REPLAY_PAYLOAD_"))
            text = replayConfirm(text, listenerMessage);
        if (tmp_message.contains("_ERROR_"))
            text = error(text, listenerMessage);            

        return text;
    }



    /**
     * Recebe valores de captura data_hora e retorna string formatada<br>
     * Substitui a chave _DATE_TIME_ <br>
     * EX:<br>
     * listenerMessage:
     * "messageResponse": "$_DATE_TIME_=data hora GMT",<br>
     * "plusHour": -3,<br>
     * "formatDateTime": "DD/MM/YYYY hh:mm:ss"<br>
     * 
     * 
     * @param vars map chaves text/plusHours/format
     * @return string substituída
     */
    public String dateTime(String text, ListenerMessage listenerMessage) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(listenerMessage.getFormatDateTime());
        String formatDateTime = LocalDateTime.now().plusHours(listenerMessage.getPlusHour()).format(formatter);
        return text.replace("_DATE_TIME_", formatDateTime);
    }

    /**
     * Substitui palavra chave _COD_MODULO_
     * 
     * @param vars map chaves cod_modulo
     * @return string substituída
     */
    public String codModulo(String text, ListenerMessage listenerMessage) {
        return text.replace("_COD_MODULO_", listenerMessage.getCodModulo());
    }

    /**
     * Substitui palavra chave _UUID_CONFIRM_
     * 
     * @param vars map chaves uuid_confirm
     * @return string substituída
     */
    public String uuidConfirm(String text, ListenerMessage listenerMessage) {
        return text.replace("_UUID_CONFIRM_", listenerMessage.getUuidConfirm());
    }

    /**
     * Substitui palavra chave _PAYLOAD_
     * 
     * @param vars map chaves uuid_confirm
     * @return string substituída
     */
    public String payloadConfirm(String text, String payload) {
        return text.replace("_SEND_PAYLOAD_", payload);
    }

    /**
     * Substitui palavra chave _REPLAY_PAYLOAD_ por listenerMessage.getReplayPayload()
     * @param text
     * @param listenerMessage
     * @return
     */
    private String replayConfirm(String text, ListenerMessage listenerMessage) {
        return text.replace("_REPLAY_PAYLOAD_", listenerMessage.getReplayPayload());
    }    

    /**
     * Substitui palavra chave _RESPONSE_
     * 
     * @param vars map chaves event
     * @return string substituída
     */
    public String error(String text, ListenerMessage listenerMessage) {
        return text.replace("_ERROR_", listenerMessage.getReplayPayload());
    }


}
