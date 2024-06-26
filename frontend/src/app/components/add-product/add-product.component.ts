import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service.service';
import { Product } from 'src/app/models/product.model';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  name: string = '';
  price: number = 0;
  description: string = '';
  selectedMenu: number | null = null; // Pour stocker l'ID du menu sélectionné
  menus: Menu[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.apiService.listMenus().subscribe(
      (menus: Menu[]) => {
        this.menus = menus;
        console.log('Menus chargés avec succès :', menus);
      },
      (error) => {
        console.error('Erreur lors du chargement des menus :', error);
      }
    );
  }

  onSubmit(): void {
    // Convertir le prix en nombre
    const priceNumber = parseFloat(this.price.toString());

    if (!this.name || !this.description || priceNumber <= 0 || !this.selectedMenu) {
      console.error('Veuillez remplir tous les champs et sélectionner un menu.');
      return;
    }

    // Vérifier que selectedMenu est un nombre
    if (typeof this.selectedMenu !== 'number') {
      console.error('Menu sélectionné invalide.');
      return;
    }

    this.apiService.addProductToMenu(this.selectedMenu, this.name, priceNumber, this.description).subscribe(
      (response) => {
        console.log('Produit ajouté avec succès !', response);
        // Gérer la réponse ou effectuer une redirection si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit :', error);
        // Gérer les erreurs d'ajout de produit ici
      }
    );
  }

}
