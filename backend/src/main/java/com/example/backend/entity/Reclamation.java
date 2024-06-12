package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity(name = "T_Reclamation")

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Reclamation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String description;
    @ManyToOne
    @JoinColumn(name = "user_name")
    private User user;



}
