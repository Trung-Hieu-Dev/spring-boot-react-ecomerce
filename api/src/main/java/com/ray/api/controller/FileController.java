package com.ray.api.controller;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/file")
@CrossOrigin("http://localhost:3000")
public class FileController {
    
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        String message;
        try {
            Files.copy(file.getInputStream(), Paths.get("upload/image").resolve(file.getOriginalFilename()));
            message = "Upload file successfully " + file.getOriginalFilename();
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            message = "Could not upload file " + file.getOriginalFilename();
            return new ResponseEntity<>(message, HttpStatus.EXPECTATION_FAILED);
        }
    }
    
    @GetMapping(value = "/image/{fileName}", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public ResponseEntity<byte[]> getFile(@PathVariable String fileName) throws IOException {
        Path file = Paths.get("upload/image").resolve(fileName);
        Resource resource = new UrlResource(file.toUri());
        if (resource.exists() && resource.isReadable()) {
            InputStream inputStream = resource.getInputStream();
            byte[] fileBytes = IOUtils.toByteArray(inputStream);
            return new ResponseEntity<>(fileBytes, HttpStatus.OK);
        } else {
            throw new RuntimeException("Could not find image");
        }
    }
}
