package com.example.backend.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity(name = "T_Menu")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;


    private String name ;
    private String description ;

    @OneToOne
    private Image image;

    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL)
    private List<Product> products;
}
