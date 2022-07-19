package rgf.micro.manage.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
public class Forklifts {

    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;

    @Id
    @Column(name = "moduleId", updatable = false, nullable = false)
    private Long id;

    private String codigo;

    private String fabricante;

    private String modelo;

    private String motor;

    private String anoFabricacao;

    private Integer horimetroInicial;

    private Integer hodometroInicial;

    @OneToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REMOVE }, fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "moduleId", nullable = false, foreignKey = @ForeignKey(name = "fk_forklift_module"))
    private Modules module;
}
