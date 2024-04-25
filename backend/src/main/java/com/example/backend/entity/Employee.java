package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity(name = "T_Employee")

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String mission;



}
