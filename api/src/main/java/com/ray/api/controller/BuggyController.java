package com.ray.api.controller;

import com.ray.api.dto.HttpResponse;
import com.ray.api.entity.Buggy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/buggy")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class BuggyController {
    @PostMapping("/validate-error")
    public ResponseEntity<Buggy> creatValidationError(@Valid @RequestBody Buggy buggy) {
        System.out.println(buggy);
        return new ResponseEntity<>(buggy, HttpStatus.CREATED);
    }
    
    @GetMapping("404")
    public ResponseEntity<HttpResponse> returnError404ForTesting() {
        return createHttpResponse(HttpStatus.NOT_FOUND, "There is no mapping for this url");
    }
    
    @GetMapping("500")
    public ResponseEntity<HttpResponse> returnError500ForTesting() {
        return createHttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
    }
    
    
    private ResponseEntity<HttpResponse> createHttpResponse(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(
                        httpStatus.value(),
                        httpStatus,
                        httpStatus.getReasonPhrase(),
                        message
                ),
                httpStatus
        );
    }
}
