package com.example.backend.repositories;

import com.example.backend.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;


@Repository
public interface CommandeRepository extends JpaRepository<Commande,Long> {


}
