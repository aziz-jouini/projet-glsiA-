package com.example.backend.repositories;

import com.example.backend.entity.Image;
import com.example.backend.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu,Long> {

}
