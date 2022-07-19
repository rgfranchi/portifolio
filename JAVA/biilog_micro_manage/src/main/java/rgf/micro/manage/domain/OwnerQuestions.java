package rgf.micro.manage.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class OwnerQuestions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "companyId", nullable = false, foreignKey = @ForeignKey(name = "fk_company_ownerQuestion"))
    private Companies company;

    @ManyToOne
    @JoinColumn(name = "moduleId", foreignKey = @ForeignKey(name = "fk_module_ownerQuestion"))
    private Modules module;

    @ManyToOne(optional = false)
    @JoinColumn(name = "questionId", nullable = false, foreignKey = @ForeignKey(name = "fk_ownerQuestion_question"))
    private Questions question;
}
