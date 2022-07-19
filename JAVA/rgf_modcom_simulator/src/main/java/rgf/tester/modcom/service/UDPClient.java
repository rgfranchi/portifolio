package rgf.tester.modcom.service;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;


public class UDPClient {

    private DatagramSocket socket;
    private InetAddress address;

    public UDPClient() {
        try {
            socket = new DatagramSocket();
            address = InetAddress.getByName("localhost");
        } catch (SocketException socketException) {
            System.out.println(socketException.getMessage());
            socketException.printStackTrace();
        } catch (UnknownHostException unknownHostException) {
            System.out.println(unknownHostException.getMessage());
            unknownHostException.printStackTrace();
        } 
    }

    public void stopClient() {
        socket.close();
    }

    public String sendUDPMessage(String message, Integer port) {
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
        } catch (IOException e ) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        } 
        return "";
    } 
}
