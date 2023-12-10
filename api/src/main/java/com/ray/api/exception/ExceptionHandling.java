package com.ray.api.exception;

import com.ray.api.dto.HttpResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class ExceptionHandling {
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<HttpResponse> noHandlerFoundException() {
        return new ResponseEntity<>(
                new HttpResponse(HttpStatus.NOT_FOUND.value(),
                                 HttpStatus.NOT_FOUND,
                                 HttpStatus.NOT_FOUND.getReasonPhrase(),
                                 "There is no mapping for this URL"),
                HttpStatus.NOT_FOUND
        );
    }
}
