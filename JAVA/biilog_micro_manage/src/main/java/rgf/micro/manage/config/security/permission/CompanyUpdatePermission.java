package rgf.micro.manage.config.security.permission;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.springframework.security.access.prepost.PreAuthorize;

@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasAuthority('company.update')")
public @interface CompanyUpdatePermission {
}
