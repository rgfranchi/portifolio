package pojo.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Transmissions {

    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @Column(updatable = false, nullable = false)
    // private Long id;

    @Id
    @Column(name = "moduleId", updatable = false, nullable = false)
    private Long id;

    // @Id
    // @Column(name = "moduleId")
    // private Long moduleId;

    // GPRS (General Packet Radio Service) Zig bee LoRa WiFi .. etc
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

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "moduleId", nullable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_module_transmission"))
    private Modules module;

    // @PrePersist
    // public void preUpdateTransmissionModule() {
    // System.out.println("PrePersist");
    // }

    // @PostPersist
    // public void createTransmissionModule() {
    // System.out.println("PostPersist");
    // }

    // @PreUpdate
    // public void updateTransmissionModule() {
    // System.out.println("PreUpdate");
    // }

    // @PostUpdate
    // public void posUpdateTransmissionModule() {
    // System.out.println("PostUpdate");
    // }

    // Acesso do modulo em transmissao retirado pois gerou acesso recursivo
    // utilizado moduleId modelo mais objetivo.
    // @MapsId utiliza como chave o id da tabela.
    // @OneToOne
    // @JoinColumn(name = "moduleId")
    // private Module module;
}
