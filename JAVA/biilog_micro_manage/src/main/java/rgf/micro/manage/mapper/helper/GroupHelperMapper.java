package rgf.micro.manage.mapper.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rgf.micro.manage.domain.Groups;
import rgf.micro.manage.repository.GroupRepository;

@Component
public class GroupHelperMapper {
    @Autowired
    GroupRepository defaultRepository;

    public Long asGroupId(Groups group) {
        return group.getId();
    }

    public Groups asGroup(Long dtoId) {
        return defaultRepository.findById(dtoId).orElse(null);
    }
}
