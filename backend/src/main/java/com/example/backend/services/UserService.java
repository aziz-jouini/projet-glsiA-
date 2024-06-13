package com.example.backend.services;

import com.example.backend.entity.*;
import com.example.backend.repositories.CommandeRepository;
import com.example.backend.repositories.MenuRepository;
import com.example.backend.repositories.ReclamationRepository;
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
    @Autowired
    private ReclamationRepository ReclamationRepo;

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


    public Reclamation addReclamation(Reclamation reclamation) {
        return ReclamationRepo.save(reclamation);
    }


    public List<Reclamation> listReclamation() { return ReclamationRepo.findAll();
    }
    public boolean deleteReclamation(Long reclamationId) {
        if (ReclamationRepo.existsById(reclamationId)) {
            ReclamationRepo.deleteById(reclamationId);
            return true;
        }
        return false;
    }

    public boolean updateReclamation(Long reclamationId, Reclamation updateReclamation) {
        Optional<Reclamation> existingReclamationOptional = ReclamationRepo.findById(reclamationId);
        if (existingReclamationOptional.isPresent()) {
            Reclamation existingReclamation = existingReclamationOptional.get();
            existingReclamation.setDescription(updateReclamation.getDescription());
            existingReclamation.setUser(updateReclamation.getUser());
            ReclamationRepo.save(existingReclamation);
            return true;
        }
        return false;
    }


        public boolean updateCommandeStatus(Long commandeId, CommandeStatus status) {
            Optional<Commande> commandeOptional = commandeRepo.findById(commandeId);
            if (commandeOptional.isPresent()) {
                Commande commande = commandeOptional.get();
                commande.setCommandeStatus(status);
                commandeRepo.save(commande);
                return true;
            }
            return false;
        }


}

