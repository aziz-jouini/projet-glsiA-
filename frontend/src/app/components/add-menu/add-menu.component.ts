import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service.service';
import { Menu } from 'src/app/models/menu.model';
import { Image } from 'src/app/models/image.model';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  menus: Menu[] = [];
  nom: string = '';
  description: string = '';
  photo: File | null = null;
  imageId: number  | null = null; // Pour stocker l'ID de l'image associée au menu
  isAdmin: boolean = false;
  productList : Product[] = [];
  isPopupVisible: boolean = false;
  constructor(private apiService: ApiService,private router:Router) { }

  ngOnInit(): void {
    this.loadMenus();


    this.apiService.loadProfile();
    if (this.apiService.UserRole === 'ADMIN') {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
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


  showProductsForMenu(menuId: number): void {
    this.isPopupVisible = true;

   this.apiService.listProducts(menuId).subscribe(
    (productList: Product[]) => {
      this.productList = [];

      productList.forEach(product => {
        if (product) {
          this.productList.push(product);
        }
      });
    },
    error => {
      console.error('Erreur lors de la récupération des produits pour la session : ', error);
    }
  );
  }


  closePopup(): void {
    this.isPopupVisible = false;
  }

  onSubmit(): void {
    if (!this.nom || !this.description || !this.photo) {
      console.error('Veuillez remplir tous les champs et sélectionner une image.');
      return;
    }

    this.apiService.addMenu(this.nom, this.description, this.photo).subscribe(
      (response) => {
        console.log('Menu ajouté avec succès !', response);
        // Maintenant, mettons à jour le menu avec l'ID de l'image
        const menuId = response.id; // Supposons que la réponse contient l'ID du menu ajouté
        if (this.imageId !== null) {
          this.updateMenuWithImage(menuId, this.imageId);
        } else {
          console.error('L\'ID de l\'image est null. Impossible de mettre à jour le menu avec une image.');
        }
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du menu :', error);
        //redirection vers home
        this.router.navigate(['/home']);

        //location reload apres 1s
        setTimeout(() => {
          window.location.reload();
        }, 750);

      }
    );
  }


  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.photo = files[0];
    }
  }

  onImageSelected(imageId: number): void {
    this.imageId = imageId;
  }

  // Méthode pour mettre à jour le menu avec l'ID de l'image
  updateMenuWithImage(menuId: number, imageId: number): void {
    this.apiService.updateMenuWithImage(menuId, imageId).subscribe(
      (response) => {
        console.log('Menu mis à jour avec l\'ID de l\'image !', response);
        // Gérer la réponse ou effectuer une redirection si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du menu avec l\'ID de l\'image :', error);
        // Gérer les erreurs de mise à jour du menu ici
      }
    );
  }
}
