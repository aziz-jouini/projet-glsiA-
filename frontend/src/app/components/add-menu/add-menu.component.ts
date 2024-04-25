import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service.service';
import { Menu } from 'src/app/models/menu.model';
import { Image } from 'src/app/models/image.model';

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

  constructor(private apiService: ApiService) { }
  
  ngOnInit(): void {
    this.loadMenus();
    // Stocker les données dans localStorage
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
        // Gérer les erreurs d'ajout de menu ici
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
