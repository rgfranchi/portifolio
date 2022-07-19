package rgf.micro.manage.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Operators;
import rgf.micro.manage.exceptions.SaveDataException;
import rgf.micro.manage.exceptions.DeleteNotFoundException;
import rgf.micro.manage.exceptions.UpdateNotFoundException;
import rgf.micro.manage.mapper.OperatorMapper;
import rgf.micro.manage.model.OperatorDto;
import rgf.micro.manage.repository.OperatorRepository;

@RequiredArgsConstructor
@Service
public class OperatorServiceImpl implements OperatorService {

	private final OperatorRepository domainRepository;
	private final OperatorMapper domainMapper;

	@Override
	public Boolean create(OperatorDto dto) {
		try {
			Operators operator = domainMapper.operatorDtoToOperator(dto);
			operator.setDeleted(false);
			domainMapper.operatorToOperatorDto(domainRepository.save(operator));
		} catch (Exception e) {
			throw new SaveDataException(e.getMessage(), "Operator");
		}
		return true;
	}

	@Override
	public Boolean update(OperatorDto dto) {
		if (domainRepository.existsById(dto.getId())) {
			return create(dto);
		} else {
			throw new UpdateNotFoundException(dto.getId(), "Operator");
		}
	}

	@Override
	public List<OperatorDto> listAll() {
		List<OperatorDto> listDto = new ArrayList<>();
		domainRepository.findAll().forEach(operator -> {
			listDto.add(domainMapper.operatorToOperatorDto(operator));
		});
		return listDto;
	}

	@Override
	public List<OperatorDto> findByCompany(Long id) {
		List<OperatorDto> listDto = new ArrayList<>();
		domainRepository.findByCompanyId(id).forEach(each -> {
			System.out.println(each.getCompany().getNomeContato());
			listDto.add(domainMapper.operatorToOperatorDto(each));
		});
		return listDto;
	}

	@Override
	public OperatorDto findById(Long id) {
		Optional<Operators> operator = domainRepository.findById(id);
		return domainMapper.operatorToOperatorDto(operator.orElse(null));
	}

	/**
	 * O registro de operador é marcado como excluído. Motivo é possibilitar a
	 * atualização no módulo e não perder o registro.
	 */
	@Override
	public Boolean delete(Long id) {
		Optional<Operators> operator = domainRepository.findById(id);
		if (operator.isPresent()) {
			operator.get().setDeleted(true);
			domainRepository.save(operator.get());
		} else {
			throw new DeleteNotFoundException(id, "Operador");
		}
		return true;
	}
}
