package com.example.backend.services;


import com.example.backend.entity.AuthenticationResponse;
import com.example.backend.entity.User;
import com.example.backend.repositories.UserRepo;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepo userRepo;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    public AuthenticationService(UserRepo userRepo, JwtService jwtService, PasswordEncoder passwordEncoder,AuthenticationManager authenticationManager) {

        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager=authenticationManager;
    }



    public AuthenticationResponse register(User request) {
        User user = new User();

        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());

        user.setPassword(passwordEncoder.encode(request.getPassword()));



       user.setRole(request.getRole());

        user.setUsername(request.getUsername());

        user = userRepo.save(user);
        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(token);


    }



    public AuthenticationResponse authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        // Récupérer l'utilisateur depuis la base de données
        User user = userRepo.findByUsername(request.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

        // Vérifier si l'utilisateur a un rôle défini
        if (user.getRole() == null) {
            // Gérer le cas où le rôle de l'utilisateur n'est pas défini
            throw new RuntimeException("Role not defined for user: " + user.getUsername());
        }

        // Générer le token JWT avec le rôle de l'utilisateur
        String token = jwtService.generateToken(user);

        // Créer une nouvelle instance d'AuthenticationResponse avec le token et le rôle
        AuthenticationResponse response = new AuthenticationResponse(token);
        response.setRole(user.getRole()); // Définir le rôle dans la réponse

        // Retourner la réponse d'authentification avec le token JWT et le rôle
        return response;
    }


}
