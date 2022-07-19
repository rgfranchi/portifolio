package rgf.micro.manage.mapper.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rgf.micro.manage.domain.Places;
import rgf.micro.manage.exceptions.IdMustNotBeNullException;
import rgf.micro.manage.repository.PlaceRepository;

@Component
public class PlaceHelperMapper {
    @Autowired
    PlaceRepository defaultRepository;

    public Long asPlaceId(Places entity) {
        return entity.getId();
    }

    public Places asPlace(Long dtoId) {
        if (dtoId == null) {
            throw new IdMustNotBeNullException("Place");
        }
        return defaultRepository.findById(dtoId)
                .orElseThrow(() -> new IllegalStateException("Não localizado Place ID"));
    }
}
