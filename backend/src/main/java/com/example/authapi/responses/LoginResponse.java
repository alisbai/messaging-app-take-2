package com.example.authapi.responses;

import java.util.Map;

public class LoginResponse {
    private String token;

    private long expiresIn;

    private Map<String , String> error;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public void setError(Map<String, String> error) {
        this.error = error;
    }

    public Map<String, String> getError () {
        return this.error;
    }
}
