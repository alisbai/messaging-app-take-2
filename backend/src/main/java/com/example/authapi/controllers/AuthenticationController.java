package com.example.authapi.controllers;

import com.example.authapi.dtos.LoginUserDto;
import com.example.authapi.dtos.RegisterUserDto;
import com.example.authapi.entities.User;
import com.example.authapi.responses.LoginResponse;
import com.example.authapi.services.AuthenticationService;
import com.example.authapi.services.JwtService;
import io.jsonwebtoken.lang.Maps;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/api/v1/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterUserDto registerUserDto) {
        try {
            User registerUser = authenticationService.signup(registerUserDto);
            String token = jwtService.generateToken(registerUser);
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(token);
            loginResponse.setExpiresIn(jwtService.getExpirationTime());
            return ResponseEntity.ok(loginResponse);
        } catch (DataIntegrityViolationException e) {
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setError(Maps.of("message", "Something went wrong, could not save user").build());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(loginResponse);
        }


    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        try {
            User authenticatedUser = authenticationService.authenticate(loginUserDto);

            String token = jwtService.generateToken(authenticatedUser);

            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(token);
            loginResponse.setExpiresIn(jwtService.getExpirationTime());

            return ResponseEntity.ok(loginResponse);

        } catch (Exception e) {
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setError(Maps.of("message", "Something went wrong").build());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(loginResponse);
        }
    }
}
