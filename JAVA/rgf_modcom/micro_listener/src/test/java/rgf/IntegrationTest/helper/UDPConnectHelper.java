package rgf.IntegrationTest.helper;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UDPConnectHelper {
    private DatagramSocket socket;
    private InetAddress address;

    public void startClient() throws SocketException, UnknownHostException {
        socket = new DatagramSocket();
        address = InetAddress.getByName("localhost");
    }

    public void stopClient() throws SocketException, UnknownHostException {
        socket.close();
    }

    /**
     * Conecta e envia mensagem pata teste.
     * 
     * @return
     */
    public String sendMessage(String message, Integer port) {
        log.info("Conecta e envia mensagem.");

        if (socket == null) {
            return null;
        }

        try {
            // envia mensagem
            // socket.setSoTimeout(10000);
            byte[] bufferSend = message.getBytes();
            DatagramPacket sendPacket = new DatagramPacket(bufferSend, bufferSend.length,
                    address, port);
            socket.send(sendPacket);

            // recebe mensagem
            byte[] bufferReceive = new byte[bufferSend.length * 10];
            DatagramPacket receivePacket = new DatagramPacket(bufferReceive, bufferReceive.length);
            socket.receive(receivePacket);
            String resp = new String(receivePacket.getData(), "UTF-8");
            return resp.trim();
        } catch (IOException e) {
            return e.getMessage();
        }
    }
}
