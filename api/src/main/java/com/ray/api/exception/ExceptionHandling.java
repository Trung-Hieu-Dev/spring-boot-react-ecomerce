package com.ray.api.exception;

import com.ray.api.dto.HttpResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.persistence.NoResultException;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class ExceptionHandling {
    // Handle 404 error
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<HttpResponse> noHandlerFoundException() {
        return createHttpResponse(HttpStatus.NOT_FOUND, "There is no mapping for this URL");
    }
    
    // Handle 500 error
    @ExceptionHandler(Exception.class)
    public ResponseEntity<HttpResponse> internalServerErrorException(Exception ex) {
        if (ex instanceof MethodArgumentNotValidException) {
            MethodArgumentNotValidException notValidException = (MethodArgumentNotValidException) ex;
            StringBuilder errors = new StringBuilder();
            notValidException.getBindingResult().getAllErrors().forEach(error -> {
                String message = error.getDefaultMessage();
                errors.append(message + "; ");
            });
            return createHttpResponse(HttpStatus.BAD_REQUEST, errors.toString());
        }
        
        return createHttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }
    
    // handle no basket
    @ExceptionHandler(NoResultException.class)
    public ResponseEntity<HttpResponse> noResultException(Exception ex) {
        return createHttpResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }
    
    // handle no buyerId
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<HttpResponse> noSuchElementException(Exception ex) {
        return createHttpResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
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
