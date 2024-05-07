package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


@Entity(name = "T_Product")

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private double price;
    private String description;




    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "menu_id")
    private Menu menu;

    // Getters and setters
}
