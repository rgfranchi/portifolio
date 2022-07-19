package rgf.micro.manage.domain;

import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
public class Users implements UserDetails, CredentialsContainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    private String nome;

    private String email;

    private String password;

    @Builder.Default
    private Boolean accountNonExpired = true;

    @Builder.Default
    private Boolean accountNonLocked = true;

    @Builder.Default
    private Boolean credentialsNonExpired = true;

    @Builder.Default
    private Boolean enabled = true;

    // @Singular
    // @ManyToMany(cascade = CascadeType.MERGE)
    // @JoinTable(name = "user_authority", joinColumns = {
    // @JoinColumn(name = "USER_ID", referencedColumnName = "ID") },
    // inverseJoinColumns = {
    // @JoinColumn(name = "AUTHORITY_ID", referencedColumnName = "ID") })
    // private Set<Authorities> authorities;

    // @Transient
    // private Set<Authorities> authorities;

    // public Set<Authorities> getAuthorities() {
    // return this.group.getAuthorities();
    // }

    @OneToOne
    @JoinColumn(name = "groupId", nullable = false, foreignKey = @ForeignKey(name = "fk_group_user"))
    private Groups group;

    @ManyToOne
    @JoinColumn(name = "companyId", nullable = false, foreignKey = @ForeignKey(name = "fk_company_user"))
    private Companies company;

    @Override
    public Set<GrantedAuthority> getAuthorities() {
        return this.group.getAuthorities().stream().map(authority -> {
            return new SimpleGrantedAuthority(authority.getPermission());
        }).collect(Collectors.toSet());
    }

    // @Column(name = "email")
    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    @Override
    public void eraseCredentials() {
        this.password = null;
    }

}
