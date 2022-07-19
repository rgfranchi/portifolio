package rgf.tester.modcom;

import rgf.tester.modcom.process.ArrayMessages;
import rgf.tester.modcom.service.UDPClient;

/**
 * Programa para testar funcionalidades do sistema modcom.<br>
 * Simula envio de mensagens pelo módulo.<br>
 * verificar na pasta 'process' cada uma das opções.
 */
public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "Start PROCESS" );
        // Conecta com servidor.
        UDPClient udpClient = new UDPClient();
        // executa processo.
        new ArrayMessages().simpleMessage(udpClient);
        // Desconecta do servidor.
        udpClient.stopClient();
    }
}
