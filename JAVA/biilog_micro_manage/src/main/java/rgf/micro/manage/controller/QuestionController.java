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
import rgf.micro.manage.model.QuestionDto;
import rgf.micro.manage.services.QuestionService;

@RequiredArgsConstructor
@RequestMapping("/api/v0/question")
@RestController
public class QuestionController {

    private final QuestionService domainService;

    @PostMapping
    public ResponseEntity<Boolean> saveNew(@RequestBody @Validated QuestionDto dto) {
        return new ResponseEntity<Boolean>(domainService.create(dto), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Boolean> saveUpdate(@RequestBody @Validated QuestionDto dto) {
        return new ResponseEntity<Boolean>(domainService.update(dto), HttpStatus.OK);
    }

    @GetMapping("findAll")
    public ResponseEntity<List<QuestionDto>> findAll() {
        List<QuestionDto> dto = domainService.listAll();
        HttpStatus httpStatus = dto.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<QuestionDto>>(dto, httpStatus);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity<QuestionDto> findById(@PathVariable("id") Long id) {
        QuestionDto dto = domainService.findById(id);
        HttpStatus httpStatus = dto == null ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<QuestionDto>(dto, httpStatus);
    }

    @GetMapping("findByCompany/{id}")
    public ResponseEntity<List<QuestionDto>> findByCompany(@PathVariable("id") Long id) {
        List<QuestionDto> dto = domainService.findByCompany(id);
        HttpStatus httpStatus = dto.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<QuestionDto>>(dto, httpStatus);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        return new ResponseEntity<Boolean>(domainService.delete(id), HttpStatus.ACCEPTED);
    }

}
