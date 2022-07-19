package rgf.micro.manage.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Places;
import rgf.micro.manage.exceptions.DeleteCannotBeException;
import rgf.micro.manage.exceptions.DeleteNotFoundException;
import rgf.micro.manage.exceptions.SaveDataException;
import rgf.micro.manage.exceptions.UpdateNotFoundException;
import rgf.micro.manage.mapper.PlaceMapper;
import rgf.micro.manage.model.PlaceDto;
import rgf.micro.manage.repository.PlaceRepository;

@RequiredArgsConstructor
@Service
public class PlaceServiceImpl implements PlaceService {

    private final PlaceRepository domainRepository;
    private final PlaceMapper domainMapper;

    @Override
    public Boolean create(PlaceDto dto) {
        try {
            Places entities = domainMapper.placeDtoToPlace(dto);
            domainRepository.save(entities);
        } catch (Exception e) {
            throw new SaveDataException(e.getMessage(), "Place");
        }
        return true;
    }

    @Override
    public Boolean update(PlaceDto dto) {
        if (domainRepository.existsById(dto.getId())) {
            create(dto);
        } else {
            throw new UpdateNotFoundException(dto.getId(), "Place");
        }
        return true;
    }

    @Override
    public List<PlaceDto> listAll() {
        List<PlaceDto> listDto = new ArrayList<>();
        domainRepository.findAll().forEach(each -> {
            listDto.add(domainMapper.placeToPlaceDto(each));
        });
        return listDto;
    }

    @Override
    public List<PlaceDto> findByCompany(Long id) {
        List<PlaceDto> listDto = new ArrayList<>();
        domainRepository.findByCompanyId(id).forEach(each -> {
            System.out.println(each.getCompany().getNomeContato());
            listDto.add(domainMapper.placeToPlaceDto(each));
        });
        return listDto;
    }

    @Override
    public PlaceDto findById(Long id) {
        Optional<Places> optionalDomain = domainRepository.findById(id);
        return domainMapper.placeToPlaceDto(optionalDomain.orElse(null));
    }

    @Override
    public Boolean delete(Long id) {
        if (id == 1L) {
            throw new DeleteCannotBeException(id, "Place");
        }
        if (domainRepository.existsById(id)) {
            domainRepository.deleteById(id);
        } else {
            throw new DeleteNotFoundException(id, "Place");
        }
        return true;
    }

}
