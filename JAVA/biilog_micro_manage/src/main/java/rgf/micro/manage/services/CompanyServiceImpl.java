package rgf.micro.manage.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.exceptions.DeleteCannotBeException;
import rgf.micro.manage.exceptions.DeleteNotFoundException;
import rgf.micro.manage.exceptions.SaveDataException;
import rgf.micro.manage.exceptions.UpdateNotFoundException;
import rgf.micro.manage.mapper.CompanyMapper;
import rgf.micro.manage.model.CompanyDto;
import rgf.micro.manage.model.CompanySelectDto;
import rgf.micro.manage.repository.CompanyRepository;

@RequiredArgsConstructor
@Service
public class CompanyServiceImpl implements CompanyService {

	private final CompanyRepository domainRepository;
	private final CompanyMapper domainMapper;
	private String entityName = "Company";

	@Override
	public Boolean create(CompanyDto dto) {
		try {
			domainRepository.save(domainMapper.companyDtoToCompany(dto));
		} catch (Exception e) {
			throw new SaveDataException(e.getMessage(), entityName);
		}
		return true;
	}

	@Override
	public Boolean update(CompanyDto dto) {
		if (domainRepository.existsById(dto.getId())) {
			return create(dto);
		} else {
			throw new UpdateNotFoundException(dto.getId(), entityName);
		}
	}

	@Override
	public List<CompanyDto> listAll() {
		List<CompanyDto> listDto = new ArrayList<>();
		domainRepository.findAll().forEach(company -> {
			listDto.add(domainMapper.companyToCompanyDto(company));
		});
		return listDto;
	}

	@Override
	public List<CompanySelectDto> listAllCompanySelectDto() {
		return (List<CompanySelectDto>) domainRepository.findAllCompanySelect();
	}

	/**
	 * Tutorial Optional:
	 * https://www.oracle.com/technical-resources/articles/java/java8-optional.html
	 */
	@Override
	public CompanyDto findById(Long id) {
		Optional<Companies> entity = domainRepository.findById(id);
		return domainMapper.companyToCompanyDto(entity.orElse(null));
	}

	@Override
	public Boolean delete(Long id) {
		if (id == 1L) {
			throw new DeleteCannotBeException(id, entityName);
		}
		if (domainRepository.existsById(id)) {
			domainRepository.deleteById(id);
		} else {
			throw new DeleteNotFoundException(id, entityName);
		}
		return true;
	}
}
