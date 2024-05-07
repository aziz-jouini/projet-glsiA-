package com.example.backend.services;

import com.example.backend.entity.User;
import com.example.backend.repositories.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepo userRepo;

    public UserDetailsServiceImpl(UserRepo userRepo) {
        this.userRepo=userRepo;

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("username not found"));
    }


}
