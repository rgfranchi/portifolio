package rgf.micro.manage.mapper.helper;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rgf.micro.manage.domain.Operators;
import rgf.micro.manage.repository.OperatorRepository;

@Component
public class OperatorHelperMapper {
    @Autowired
    OperatorRepository defaultRepository;

    public List<Long> asListId(Set<Operators> entities) {
        List<Long> listIds = new ArrayList<Long>();
        entities.forEach(operator -> {
            listIds.add(operator.getId());
        });
        return listIds;
    }

    public Set<Operators> asListOpertors(List<Long> dtoIds) {
        Set<Operators> listOperators = new HashSet<Operators>();
        defaultRepository.findAllById(dtoIds).forEach(listOperators::add);
        return listOperators;
    }
}
