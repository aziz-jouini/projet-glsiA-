package com.example.backend.services;

import com.example.backend.entity.*;
import com.example.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private ReclamationRepository reclamationRepository;

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

    public Employee addEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public List<Employee> listEmployees() {return employeeRepo.findAll();
    }

    public List<Reclamation> listReclamations() {return reclamationRepository.findAll();
    }


    public Menu updateMenu(Long id, Menu updatedMenu) {
        // Vérifiez si le menu existe
        Menu existingMenu = menuRepository.findById(id).orElse(null);
        // Mettez à jour les champs du menu existant avec les nouvelles valeurs
        existingMenu.setName(updatedMenu.getName());
        existingMenu.setDescription(updatedMenu.getDescription());
        // Sauvegardez le menu mis à jour dans la base de données
        return menuRepository.save(existingMenu);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = productRepository.findById(id).orElse(null);

        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setName(updatedProduct.getName());

        return productRepository.save(existingProduct);
    }

    public void removeMenu(Long menuId) {
        menuRepository.deleteById(menuId);
    }
    public boolean deleteEmployee(Long employeeId) {
        if (employeeRepo.existsById(employeeId)) {
            employeeRepo.deleteById(employeeId);
            return true;
        }
        return false;
    }
    public boolean updateEmployee(Long employeeId, Employee updatedEmployee) {
        Optional<Employee> existingEmployeeOptional = employeeRepo.findById(employeeId);
        if (existingEmployeeOptional.isPresent()) {
            Employee existingEmployee = existingEmployeeOptional.get();
            existingEmployee.setName(updatedEmployee.getName());
            existingEmployee.setMission(updatedEmployee.getMission());
            employeeRepo.save(existingEmployee);
            return true;
        }
        return false;
    }


}
