package com.ray.api.entity;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class Buggy {
    @NotEmpty
    @Size(min = 2, message = "username should have at least 2 character")
    private String name;
    
    @NotEmpty
    @Email
    private String email;
}
