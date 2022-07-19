package rgf.micro.manage.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;
import rgf.micro.manage.model.PlaceDto;
import rgf.micro.manage.services.PlaceService;

@AllArgsConstructor
@RequestMapping("/api/v0/place")
@Controller
public class PlaceController {

    private final PlaceService domainService;

    @PostMapping
    public ResponseEntity<Boolean> saveNew(@RequestBody @Validated PlaceDto dto) {
        return new ResponseEntity<Boolean>(domainService.create(dto), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Boolean> saveUpdate(@RequestBody @Validated PlaceDto dto) {
        return new ResponseEntity<Boolean>(domainService.update(dto), HttpStatus.OK);
    }

    @GetMapping("findAll")
    public ResponseEntity<List<PlaceDto>> findAll() {
        List<PlaceDto> dto = domainService.listAll();
        HttpStatus httpStatus = dto.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<PlaceDto>>(dto, httpStatus);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity<PlaceDto> findById(@PathVariable("id") Long id) {
        PlaceDto dto = domainService.findById(id);
        HttpStatus httpStatus = dto == null ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<PlaceDto>(dto, httpStatus);
    }

    @GetMapping("findByCompany/{id}")
    public ResponseEntity<List<PlaceDto>> findByCompany(@PathVariable("id") Long id) {
        List<PlaceDto> dto = domainService.findByCompany(id);
        HttpStatus httpStatus = dto.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<PlaceDto>>(dto, httpStatus);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        return new ResponseEntity<Boolean>(domainService.delete(id), HttpStatus.ACCEPTED);
    }
}
