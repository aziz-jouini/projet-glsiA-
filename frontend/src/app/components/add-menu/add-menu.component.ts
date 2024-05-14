import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  menus: Menu[] = [];
  id: number = 0;
  nom: string = '';
  description: string = '';
  photo: File | null = null;
  imageId: number  | null = null; // Pour stocker l'ID de l'image associée au menu
  isAdmin: boolean = false;
  productList : Product[] = [];
  isPopupVisible: boolean = false;
  showModal: boolean = false;
  isUpdate: boolean = false;
  product: Product = {id:0,name:'',description:'',price:0,menu:{id:0,name:'',description:'',imageId:0}};
  showModalProduct: boolean = false;
  isUpdateProduct: boolean = false;
  menu: Menu = {id:0,name:'',description:'',imageId:0};
  isAddMenuFormVisible: boolean = false;




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



  openPopupForUpdate(menutoupdate:any) {
    this.menu=menutoupdate;
    this.showModal = true;
    this.isUpdate=true;

  }

  closePopupForUpdate() {
    this.showModal = false;
  }




  updateMenu(id: number, updatedMenu: any): void {
    this.apiService.updateMenu(id, updatedMenu).subscribe(
      (response) => {
        console.log('Menu mis à jour avec succès !', response);
        // Gérez la réponse ou effectuez des actions supplémentaires si nécessaire

      },
      (error) => {
        console.error('Erreur lors de la mise à jour du menu :', error);
        // Gérez les erreurs ici
      }
    );
    this.closePopupForUpdate();
  }

  openPopupForUpdateProduct(producttoupdate: any) {
    this.product=producttoupdate;
    this.showModalProduct = true;
    this.isUpdateProduct=true;  }

    closePopupForUpdateProduct() {
      this.showModalProduct = false;
    }

    updateProduct(id: number, updatedProduct: any): void {
      this.apiService.updateProduct(id, updatedProduct).subscribe(
        (response) => {
          console.log('Produit mis à jour avec succès !', response);
          // Gérez la réponse ou effectuez des actions supplémentaires si nécessaire
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du produit :', error);
          // Gérez les erreurs ici
        }
      );
      this.closePopupForUpdateProduct();
    }

    deleteProduct(arg0: number) {
      this.apiService.deleteProduct(arg0).subscribe(
        (response) => {
          console.log('Produit supprimé avec succès !', response);
          this.closePopup();
        },
        (error) => {
          console.error('Erreur lors de la suppression du produit :', error);
          this.closePopup();


        }
      );
      }
      deleteMenu(arg0: number) {
      this.apiService.deleteMenu(arg0).subscribe(
        (response) => {
          console.log('Menu supprimé avec succès !', response);
          this.loadMenus();

        },
        (error) => {
          console.error('Erreur lors de la suppression du menu :', error);
        }
      );
      }

      toggleAddMenuFormVisibility(): void {
        this.isAddMenuFormVisible = !this.isAddMenuFormVisible;
      }

}
