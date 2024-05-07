package com.example.backend.controller;


import com.example.backend.entity.Commande;
import com.example.backend.entity.Menu;
import com.example.backend.entity.Product;
import com.example.backend.entity.Reclamation;
import com.example.backend.services.AdminService;
import com.example.backend.services.UserDetailsServiceImpl;
import com.example.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;

    @GetMapping("/listmenu")
    public ResponseEntity<List<Menu>> listMenus(){
        List<Menu> list = userService.listMenus();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @GetMapping("/listproducts/{menuId}")
    public ResponseEntity<List<Product>> listProducts(@PathVariable("menuId") Long menuId) {
        List<Product> productList = userService.listProductsByMenuId(menuId);
        return new ResponseEntity<>(productList, HttpStatus.OK);

    }
    @PostMapping("/addcommande")
    public ResponseEntity<Commande> addCommande(@RequestBody Commande commande) {
        Commande addedCommande = userService.addCommande(commande);
        return new ResponseEntity<>(addedCommande, HttpStatus.CREATED);
    }

    @GetMapping("/listcommande")
    public ResponseEntity<List<Commande>> listCommandes() {
        List<Commande> commandes = userService.listCommandes();
        return new ResponseEntity<>(commandes, HttpStatus.OK);
    }
    @PostMapping("/addreclamation")
    public ResponseEntity<Reclamation> addReclamation(@RequestBody Reclamation reclamation) {
        Reclamation addedReclamation = userService.addReclamation(reclamation);
        return new ResponseEntity<>(addedReclamation, HttpStatus.CREATED);
    }





}
