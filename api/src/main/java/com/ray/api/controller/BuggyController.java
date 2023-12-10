package com.ray.api.controller;

import com.ray.api.entity.Buggy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/buggy")
@CrossOrigin("http://localhost:3000")
public class BuggyController {
    @PostMapping("/validate-error")
    public ResponseEntity<Buggy> creatValidationError(@Valid @RequestBody Buggy buggy) {
        System.out.println(buggy);
        return new ResponseEntity<>(buggy, HttpStatus.CREATED);
    }
}
