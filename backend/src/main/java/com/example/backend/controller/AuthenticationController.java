package com.example.backend.controller;

import com.example.backend.entity.AuthenticationResponse;
import com.example.backend.entity.User;
import com.example.backend.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse>register (@RequestBody User request){

        return ResponseEntity.ok(authenticationService.register(request));
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login (@RequestBody User request){
        return ResponseEntity.ok(authenticationService.authenticate(request));

    }
}
