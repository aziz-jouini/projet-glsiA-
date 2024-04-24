package com.example.backend.entity;

public class AuthenticationResponse {
    private String token;
    private Role role; // Ajouter la propriété role

    public AuthenticationResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setRole(Role role) {
        this.role = role; // Mettre à jour la propriété role
    }

    public Role getRole() {
        return role; // Ajouter une méthode pour récupérer le rôle
    }
}
