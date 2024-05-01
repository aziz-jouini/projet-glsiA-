package com.example.backend.controller;

import com.example.backend.Cloudinary.CloudinaryService;
import com.example.backend.entity.*;
import com.example.backend.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin2")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    private final CloudinaryService cloudinaryService;
    private final AdminService adminService;

    @PostMapping("/addmenu")
    public ResponseEntity<String> addMenu(@RequestParam("nom") String nom,
                                          @RequestParam("photo") MultipartFile photo, @RequestParam("description") String description) throws IOException {
        if (photo.isEmpty()) {
            return new ResponseEntity<>("Veuillez sélectionner une image.", HttpStatus.BAD_REQUEST);
        }

        Map result = cloudinaryService.upload(photo);
        String photoUrl = (String) result.get("url");

        Image image = new Image();
        image.setName(photo.getOriginalFilename());
        image.setImageUrl(photoUrl);
        image.setImageId((String) result.get("public_id"));
        adminService.saveImage(image);

        Menu menu = new Menu();
        menu.setName(nom);
        menu.setDescription(description);
        menu.setImage(image);

        adminService.addMenu(menu);

        return new ResponseEntity<>("Menu ajouté avec succès !", HttpStatus.OK);
    }

    @GetMapping("/listmenu")
    public ResponseEntity<List<Menu>> listMenus(){
        List<Menu> list = adminService.listMenus();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/cloudinary/list")
    public ResponseEntity<List<Image>> listImages(){
        List<Image> list = adminService.listImages();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/cloudinary/upload")
    @ResponseBody
    public ResponseEntity<String> uploadImage(@RequestParam MultipartFile multipartFile) throws IOException {
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            return new ResponseEntity<>("Image non valide!", HttpStatus.BAD_REQUEST);
        }
        Map result = cloudinaryService.upload(multipartFile);
        Image image = new Image((String) result.get("original_filename"),
                (String) result.get("url"),
                (String) result.get("public_id"));
        adminService.saveImage(image);
        return new ResponseEntity<>("image ajoutée avec succès ! ", HttpStatus.OK);
    }

    @DeleteMapping("/cloudinary/delete/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable("id") int id) {
        if (!adminService.imageExists(id)) {
            return new ResponseEntity<>("Image non trouvée", HttpStatus.NOT_FOUND);
        }
        Image image = adminService.getImageById(id).orElse(null);
        if (image == null) {
            return new ResponseEntity<>("Image non trouvée", HttpStatus.NOT_FOUND);
        }

        String cloudinaryImageId = image.getImageId();
        try {
            cloudinaryService.delete(cloudinaryImageId);
        } catch (IOException e) {
            return new ResponseEntity<>("Échec de la suppression de l'image de Cloudinary", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        adminService.deleteImage(id);
        return new ResponseEntity<>("Image supprimée !", HttpStatus.OK);
    }

    @PostMapping("/addproduct/{menuId}")
    public ResponseEntity<String> addProduct(@PathVariable("menuId") Long menuId,
                                             @RequestParam("name") String name,
                                             @RequestParam("price") double price,
                                             @RequestParam("description") String description) {
        Menu menu = adminService.getMenuById(menuId);
        if (menu == null) {
            return new ResponseEntity<>("Menu non trouvé", HttpStatus.NOT_FOUND);
        }

        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setDescription(description);
        product.setMenu(menu); // Assigner le menu trouvé au produit

        Product savedProduct = adminService.addProductToMenu(product, menuId);
        if (savedProduct != null) {
            return new ResponseEntity<>("Produit ajouté avec succès !", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Impossible d'ajouter le produit au menu", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/deleteproduct/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") Long productId) {
        if (!adminService.productExists(productId)) {
            return new ResponseEntity<>("Produit non trouvé", HttpStatus.NOT_FOUND);
        }

        adminService.removeProduct(productId);
        return new ResponseEntity<>("Produit supprimé avec succès !", HttpStatus.OK);
    }

    @GetMapping("/listproducts/{menuId}")
    public ResponseEntity<List<Product>> listProducts(@PathVariable("menuId") Long menuId) {
        List<Product> productList = adminService.listProductsByMenuId(menuId);
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }
    @GetMapping("/listcommandes")
    public ResponseEntity<List<Commande>> listCommandes() {
        List<Commande> commandes = adminService.listCommandes();
        return new ResponseEntity<>(commandes, HttpStatus.OK);
    }

    @PutMapping("/updatecommandestatus/{commandeId}/{status}")
    public ResponseEntity<String> updateCommandeStatus(@PathVariable("commandeId") Long commandeId,
                                                       @PathVariable("status") CommandeStatus status) {
        boolean updated = adminService.updateCommandeStatus(commandeId, status);
        if (updated) {
            return new ResponseEntity<>("Statut de la commande mis à jour avec succès !", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Impossible de mettre à jour le statut de la commande", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/addemployee")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee addedEmployee = adminService.addEmployee(employee);
        return new ResponseEntity<>(addedEmployee, HttpStatus.CREATED);
    }
    @GetMapping("/listemployee")
    public ResponseEntity<List<Employee>> listEmployees() {
        List<Employee> employees = adminService.listEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
    @GetMapping("/listreclamation")
    public ResponseEntity<List<Reclamation>> listReclamations() {
        List<Reclamation> reclamations = adminService.listReclamations();
        return new ResponseEntity<>(reclamations, HttpStatus.OK);
    }

}


