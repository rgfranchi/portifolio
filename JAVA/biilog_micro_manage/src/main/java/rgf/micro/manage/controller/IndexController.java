package rgf.micro.manage.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v0")
@RestController
public class IndexController {

    @GetMapping("index")
    public ResponseEntity<String> index() {
        return new ResponseEntity<String>("WORKING", HttpStatus.OK);
    }
}
