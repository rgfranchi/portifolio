package rgf.micro.manage.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Singular;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Modules {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    private String codigo;

    private String modelo;

    private String versao;

    private String fabricante;

    private Boolean ativo;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @ManyToOne
    @JoinColumn(name = "companyId", nullable = false, foreignKey = @ForeignKey(name = "fk_company_module"))
    private Companies company;

    @Singular
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "modules_operators", joinColumns = {
            @JoinColumn(name = "moduleId", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_module_operator")) }, inverseJoinColumns = {
                    @JoinColumn(name = "operatorId", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_operator_module")) }

    )
    private Set<Operators> operators;

    @ManyToOne
    @JoinColumn(name = "placeId", foreignKey = @ForeignKey(name = "fk_module_place"))
    private Places place;

    /**
     * No save é necessário alimentar o modulo com a própria transmissão. e:
     * entity.getModule().getTransmission().setModule(entity.getModule());
     */
    @OneToOne(mappedBy = "module", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn(columnDefinition = "moduleId", foreignKey = @ForeignKey(name = "moduleId"))
    private Transmissions transmission;

    // /**
    // * Alimenta objeto transmission com o próprio módulo para associar
    // * transmission.module_id
    // * Retirado e tratado no momento de salvar
    // */
    // @PostPersist
    // public void createTransmissionModule() {
    // if (this.transmission != null) {
    // this.transmission.setModule(this);
    // }
    // }

    // @PreUpdate
    // public void updateTransmissionModule() {
    // if (this.transmission != null) {
    // this.transmission.setModule(this);
    // }
    // }

    // @PostUpdate
    // public void posUpdateTransmissionModule() {
    // if (this.transmission != null) {
    // this.transmission.setModuleId(this.getId());
    // }
    // }

    // @PostUpdate
    // public void setTransmissionModule() {
    // if (this.transmission != null) {
    // this.transmission.setModuleId(this.getId());
    // if (this.transmission.getId() != null) {
    // this.transmission.setId(this.transmission.getId());
    // }
    // }

}
