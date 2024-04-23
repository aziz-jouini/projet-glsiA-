package com.example.backend.services;

import com.example.backend.entity.Commande;
import com.example.backend.entity.Image;
import com.example.backend.entity.Menu;
import com.example.backend.entity.Product;
import com.example.backend.repositories.CommandeRepository;
import com.example.backend.repositories.ImageRepo;
import com.example.backend.repositories.MenuRepository;
import com.example.backend.repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.entity.CommandeStatus;


import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private ImageRepo imageRepository;
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private ProductRepo productRepository;
    @Autowired
    private CommandeRepository commandeRepository;

    public List<Image> listImages(){
        return imageRepository.findByOrderById();
    }

    public Optional<Image> getImageById(long id){
        return imageRepository.findById(id);
    }

    public void saveImage(Image image){
        imageRepository.save(image);
    }

    public void deleteImage(long id){
        imageRepository.deleteById(id);
    }

    public boolean imageExists(long id){
        return imageRepository.existsById(id);
    }

    public List<Menu> listMenus(){
        return menuRepository.findAll();
    }

    public Menu addMenu(Menu m){
        return menuRepository.save(m);
    }

    public List<Product> listProductsByMenuId(Long menuId) {
        Optional<Menu> menuOptional = menuRepository.findById(menuId);
        return menuOptional.map(Menu::getProducts).orElse(null);
    }

    public Product addProductToMenu(Product product, Long menuId) {
        Optional<Menu> menuOptional = menuRepository.findById(menuId);
        return menuOptional.map(menu -> {
            product.setMenu(menu);
            return productRepository.save(product);
        }).orElse(null);
    }

    public void removeProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    public boolean productExists(Long productId) {
        return productRepository.existsById(productId);
    }

    public Menu getMenuById(Long menuId) {
        return menuRepository.findById(menuId).orElse(null);
    }
    public List<Commande> listCommandes() {
        return commandeRepository.findAll();
    }

    public boolean updateCommandeStatus(Long commandeId, CommandeStatus status) {
        Optional<Commande> commandeOptional = commandeRepository.findById(commandeId);
        if (commandeOptional.isPresent()) {
            Commande commande = commandeOptional.get();
            commande.setCommandeStatus(status);
            commandeRepository.save(commande);
            return true;
        }
        return false;
    }

}
