import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service.service'; // Assurez-vous de mettre le bon chemin ici
import { Menu } from 'src/app/models/menu.model'; // Assurez-vous de mettre le bon chemin ici
import { Image } from 'src/app/models/image.model'; // Assurez-vous de mettre le bon chemin ici


@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent {
  menus: Menu[] = [];
  nom: string = '';
  description: string = '';
  photo: File | null = null;

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
      console.error('Veuillez remplir tous les champs.');
      return;
    }

    this.apiService.addMenu(this.nom, this.description, this.photo).subscribe(
      (response) => {
        console.log('Menu ajouté avec succès !', response);
        // Gérer la réponse ou effectuer une redirection si nécessaire
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
}
