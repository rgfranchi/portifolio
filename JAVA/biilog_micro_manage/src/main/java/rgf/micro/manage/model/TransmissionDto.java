package rgf.micro.manage.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransmissionDto implements Serializable {

    // mesmo id do modulo.
    private Long id;

    // Zig bee GPRS LoRa WiFi .. etc
    private String tipo;
    // Fabricante do aparelho que utiliza o meio de comunicação.
    private String fabricante;
    // 2G 3G 4G ... etc.
    private String modelo;
    // numero do chip
    private String chip;
    // TIM Claro Oi VIVO
    private String operadora;
    // Numero do telefone ou codigo da linha
    private String numeroLinha;
    // Personal Identification Number
    private String pin;
    // Personal Unblocking Key
    private String puk1;
    private String puk2;
    private String puk3;
    // International Mobile Equipment Identity
    private String imei;
    // Personal Area Networks (ZigBee)
    private String pan;

    private String observacoes;
}
