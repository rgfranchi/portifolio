package rgf.tester.modcom.process;

import java.util.Arrays;

import rgf.tester.modcom.service.UDPClient;

/**
 * Saida esperada:
 * Start PROCESS
 * KEEP_ALIVE I-KEEP_ALIVE
 * --->$OK#
 * TEXT_MESSAGE II-TEXT
 * --->$2022-06-17 11:02:08!TEXT_MESSAGE II-TEXT#
 * DATE_TIME_MESSAGE III-DATE TIME
 * --->$17062022080208#
 * EVENT 1234 IV-NOT MESSAGE IN QUEUE
 * --->EVENT_NOT_FOUND$1234:bc61#
 * CONFIG 1234 V-NOT MESSAGE IN QUEUE
 * --->CONFIG_NOT_FOUND$1234:4fc67a3#
 * EVENT 5432 IV-GET MESSAGE IN QUEUE
 * --->$5432:MENSAGEM TO MODULE 5432#2955
 * UUID_CONFIRM2955
 * --->NOT FOUND$UUID_CONFIRM2955#
 * MESSAGE VII.RULE_NOT_DEFINED
 * --->RULE NOT DEFINED:MESSAGE VII.RULE_NOT_DEFINED
 * EVENT_FAIL K9DB
 * --->$EVENT_FAIL:No group 3#
 * CONFIG_FAIL K9DB
 * --->$CONFIG_FAIL:No group 5#
 */
public class ArrayMessages {
    
    /**
     * Envia e recebe mensagens de teste. <br>
     * Obs: Verificar se possui mensagem da fila 'MESSAGE_TO_MODULE' para consumo e confirmação.
     * @param udpClient
     */
    public void simpleMessage(UDPClient udpClient) {

        String[] messages = {
            "KEEP_ALIVE I-KEEP_ALIVE", // responde mensagem da configuração.
            "TEXT_MESSAGE II-TEXT", // responde um texto com parâmetros.
            "DATE_TIME_MESSAGE III-DATE TIME", // responde data time formatado.
            "EVENT 1234 IV-NOT MESSAGE IN QUEUE", // insere um evento na fila.
            "CONFIG 1234 V-NOT MESSAGE IN QUEUE", // insere uma configuração na fila.
            "EVENT 5432 IV-GET MESSAGE IN QUEUE", // recebe a mensagem 'MENSAGEM TO MODULE 4321' da fila MESSAGE_TO_MODULE, incluída ao iniciar a aplicação.
            // "UUID_CONFIRM", // envia código de confirmação de recebimento da mensagem (executa dentro do loop).
            "MESSAGE VII.RULE_NOT_DEFINED", // mensagem não definida na configuração..
            "EVENT_FAIL K9DB", // ERRO EVENTO ao verificar grupo do código do módulo.
            "CONFIG_FAIL K9DB"// ERRO CONFIGURAÇÃO ao verificar grupo do código do módulo.
        };
        
        Arrays.stream(messages).forEach(message -> {
            System.out.println(message);
            String resp = udpClient.sendUDPMessage(message, 9000);
            System.out.println("--->"+resp);
            // constrói mensagem de resposta.
            if(resp.contains("MENSAGEM TO MODULE")) {
                message = "UUID_CONFIRM" + resp.substring(resp.indexOf('#') + 1, resp.length());
                System.out.println(message);
                resp = udpClient.sendUDPMessage(message, 9000);
                System.out.println("--->"+resp);
            } 
        });

    }

}
