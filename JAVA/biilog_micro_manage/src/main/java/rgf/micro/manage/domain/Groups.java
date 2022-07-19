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
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Singular;

/**
 * Insert da tabela feito através arquivo resources/data.sql
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Groups {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    private String nome;

    /**
     * Salva acessos em json Ex: [... , { path: "/operator", label: "Operadores",
     * page: { create: {path: "/new", label: "Inserir Operador",}, update: { path:
     * "/update",}, delete: { path: "/delete", }, },}, ... ]
     */
    // @Column(columnDefinition = "TEXT")
    // private String access;

    @Singular
    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "groups_authorities", joinColumns = {
            @JoinColumn(name = "groupId", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_group_authority")) }, inverseJoinColumns = {
                    @JoinColumn(name = "authorityId", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_authority_group")) })
    private Set<Authorities> authorities;

}
