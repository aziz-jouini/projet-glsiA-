package com.example.backend.filter;

import com.example.backend.services.JwtService;
import com.example.backend.services.UserDetailsServiceImpl;
import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthentificationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsServiceImpl;

    public JwtAuthentificationFilter (JwtService jwtService,UserDetailsServiceImpl userDetailsServiceImpl) {
        this.jwtService=jwtService;
        this.userDetailsServiceImpl=userDetailsServiceImpl;
    }

    @Override
    protected void doFilterInternal
            (@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if(authHeader==null||!authHeader.startsWith("Bearer")) {
            filterChain.doFilter(request, response);
            return;

        }

        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);


        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {

            UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);

            if(jwtService.isValid(token, userDetails)) {

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken
                        (userDetails, null, userDetails.getAuthorities()) ;

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

            filterChain.doFilter(request, response);

        }
    }
}