package rgf.micro.manage.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.model.OperatorDto;
import rgf.micro.manage.services.OperatorService;

@RequiredArgsConstructor
@RequestMapping("/api/v0/operator")
@RestController
public class OperatorController {

	private final OperatorService domainService;

	@PostMapping
	public ResponseEntity<Boolean> saveNew(@RequestBody @Validated OperatorDto dto) {
		return new ResponseEntity<Boolean>(domainService.create(dto), HttpStatus.CREATED);
	}

	@PutMapping
	public ResponseEntity<Boolean> saveUpdate(@RequestBody @Validated OperatorDto dto) {
		return new ResponseEntity<Boolean>(domainService.update(dto), HttpStatus.OK);
	}

	@GetMapping("findById/{id}")
	public ResponseEntity<OperatorDto> findById(@PathVariable("id") Long id) {
		OperatorDto dto = domainService.findById(id);
		HttpStatus httpStatus = dto == null ? HttpStatus.NO_CONTENT : HttpStatus.OK;
		return new ResponseEntity<OperatorDto>(dto, httpStatus);
	}

	@GetMapping("findAll")
	public ResponseEntity<List<OperatorDto>> findAll() {
		List<OperatorDto> dto = domainService.listAll();
		HttpStatus httpStatus = dto.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK;
		return new ResponseEntity<List<OperatorDto>>(dto, httpStatus);
	}

	@GetMapping("findByCompany/{id}")
	public ResponseEntity<List<OperatorDto>> findByCompany(@PathVariable("id") Long id) {
		List<OperatorDto> dto = domainService.findByCompany(id);
		HttpStatus httpStatus = dto.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK;
		return new ResponseEntity<List<OperatorDto>>(dto, httpStatus);
	}

	@DeleteMapping("{id}")
	public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
		return new ResponseEntity<Boolean>(domainService.delete(id), HttpStatus.ACCEPTED);
	}

}