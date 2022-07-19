package rgf.micro.manage.services;

import rgf.micro.manage.services.helper.DefaultCRUDService;

import java.util.List;

import rgf.micro.manage.model.PlaceDto;

public interface PlaceService extends DefaultCRUDService<PlaceDto> {
    List<PlaceDto> findByCompany(Long id);
}
