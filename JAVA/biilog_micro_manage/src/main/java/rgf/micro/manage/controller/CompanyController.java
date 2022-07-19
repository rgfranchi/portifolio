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
import rgf.micro.manage.config.security.permission.CompanyCreatePermission;
import rgf.micro.manage.config.security.permission.CompanyDeletePermission;
import rgf.micro.manage.config.security.permission.CompanyDropdownPermission;
import rgf.micro.manage.config.security.permission.CompanyReadPermission;
import rgf.micro.manage.config.security.permission.CompanyUpdatePermission;
import rgf.micro.manage.model.CompanyDto;
import rgf.micro.manage.model.CompanySelectDto;
import rgf.micro.manage.services.CompanyService;

@RequiredArgsConstructor
@RequestMapping("/api/v0/company")
@RestController
public class CompanyController {

	private final CompanyService domainService;

	@CompanyCreatePermission
	@PostMapping
	public ResponseEntity<Boolean> saveNew(@RequestBody @Validated CompanyDto dto) {
		return new ResponseEntity<Boolean>(domainService.create(dto), HttpStatus.CREATED);
	}

	@CompanyUpdatePermission
	@PutMapping
	public ResponseEntity<Boolean> saveUpdate(@RequestBody @Validated CompanyDto dto) {
		return new ResponseEntity<Boolean>(domainService.update(dto), HttpStatus.OK);
	}

	@CompanyReadPermission
	@GetMapping("findById/{id}")
	public ResponseEntity<CompanyDto> findById(@PathVariable("id") Long id) {
		CompanyDto dto = domainService.findById(id);
		HttpStatus httpStatus = dto == null ? HttpStatus.NO_CONTENT : HttpStatus.OK;
		return new ResponseEntity<CompanyDto>(dto, httpStatus);
	}

	@CompanyReadPermission
	@GetMapping("findAll")
	public ResponseEntity<List<CompanyDto>> findAll() {
		List<CompanyDto> dto = domainService.listAll();
		HttpStatus httpStatus = dto.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK;
		return new ResponseEntity<List<CompanyDto>>(dto, httpStatus);
	}

	@CompanyDropdownPermission
	@GetMapping("findDropdown")
	public ResponseEntity<List<CompanySelectDto>> findAllCompanySelect() {
		List<CompanySelectDto> dto = domainService.listAllCompanySelectDto();
		HttpStatus httpStatus = dto.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK;
		return new ResponseEntity<List<CompanySelectDto>>(dto, httpStatus);
	}

	@CompanyDeletePermission
	@DeleteMapping("{id}")
	public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
		return new ResponseEntity<Boolean>(domainService.delete(id), HttpStatus.ACCEPTED);
	}
}