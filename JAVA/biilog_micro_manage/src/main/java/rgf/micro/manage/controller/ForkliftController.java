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
import rgf.micro.manage.model.ForkliftDto;
import rgf.micro.manage.services.ForkliftService;

@RequiredArgsConstructor
@RequestMapping("/api/v0/forklift")
@RestController
public class ForkliftController {

    private final ForkliftService domainService;

    @PostMapping
    public ResponseEntity<Boolean> saveNew(@RequestBody @Validated ForkliftDto forkliftDto) {
        return new ResponseEntity<Boolean>(domainService.create(forkliftDto), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Boolean> saveUpdate(@RequestBody @Validated ForkliftDto forkliftDto) {
        return new ResponseEntity<Boolean>(domainService.update(forkliftDto), HttpStatus.OK);
    }

    @GetMapping("findAll")
    public ResponseEntity<List<ForkliftDto>> findAll() {
        List<ForkliftDto> dto = domainService.listAll();
        HttpStatus httpStatus = dto.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<ForkliftDto>>(dto, httpStatus);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity<ForkliftDto> findById(@PathVariable("id") Long id) {
        ForkliftDto dto = domainService.findById(id);
        HttpStatus httpStatus = dto == null ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<ForkliftDto>(dto, httpStatus);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        return new ResponseEntity<Boolean>(domainService.delete(id), HttpStatus.ACCEPTED);
    }
}
