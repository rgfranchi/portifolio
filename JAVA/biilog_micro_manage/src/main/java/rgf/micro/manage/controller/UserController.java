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

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.model.UserDto;
import rgf.micro.manage.services.UserService;

@RequiredArgsConstructor
@RequestMapping("/api/v0/user")
@Controller
public class UserController {

    private final UserService domainService;

    @PostMapping
    public ResponseEntity<Boolean> saveNew(@RequestBody @Validated UserDto dto) {
        return new ResponseEntity<Boolean>(domainService.create(dto), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Boolean> saveUpdate(@RequestBody @Validated UserDto dto) {
        return new ResponseEntity<Boolean>(domainService.update(dto), HttpStatus.OK);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable("id") Long id) {
        UserDto dto = domainService.findById(id);
        HttpStatus httpStatus = dto == null ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<UserDto>(dto, httpStatus);
    }

    @GetMapping("findAll")
    public ResponseEntity<List<UserDto>> findAll() {
        List<UserDto> dto = domainService.listAll();
        HttpStatus httpStatus = dto.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<UserDto>>(dto, httpStatus);
    }

    @GetMapping("findByCompany/{id}")
    public ResponseEntity<List<UserDto>> findByCompany(@PathVariable("id") Long id) {
        List<UserDto> dto = domainService.findByCompany(id);
        HttpStatus httpStatus = dto.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<UserDto>>(dto, httpStatus);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        return new ResponseEntity<Boolean>(domainService.delete(id), HttpStatus.ACCEPTED);
    }

}
