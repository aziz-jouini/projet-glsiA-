package com.example.backend.services;

import com.example.backend.entity.Commande;
import com.example.backend.entity.Menu;
import com.example.backend.entity.Product;
import com.example.backend.repositories.CommandeRepository;
import com.example.backend.repositories.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private CommandeRepository commandeRepo;

    public List<Menu> listMenus() {
        return menuRepository.findAll();
    }

    public List<Product> listProductsByMenuId(Long menuId) {
        Optional<Menu> menuOptional = menuRepository.findById(menuId);
        return menuOptional.map(Menu::getProducts).orElse(null);
    }

    public Commande addCommande(Commande commande) {
        return commandeRepo.save(commande);
    }

    public List<Commande> listCommandes() {
        return commandeRepo.findAll();
    }



}

