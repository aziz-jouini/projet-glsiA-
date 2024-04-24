import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service.service';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  image!: File;
  images: Image[] = []; // Liste des images

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Appelez la méthode du service pour récupérer la liste des images
    this.apiService.listImages().subscribe(
      (response: Image[]) => { // Ajoutez le type de réponse (Image[])
        console.log('Liste des images récupérée avec succès:', response);
        this.images = response; // Affectez la réponse à la liste des images
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des images:', error);
        // Gérer les erreurs
      }
    );
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('multipartFile', this.image);

    this.apiService.uploadImage(formData).subscribe(
      (response) => {
        console.log('Image ajoutée avec succès:', response);
        // Gérer la réponse de l'API
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'image:', error);
        // Gérer les erreurs
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.image = file;
    }
  }

  deleteImage(imageId: number | undefined): void {
    if (imageId !== undefined) { // Vérifiez si l'ID de l'image est défini
      this.apiService.deleteImage(imageId).subscribe(
        () => {
          console.log('Image supprimée avec succès');
          // Rafraîchir la liste des images après suppression
          this.images = this.images.filter(image => image.id !== imageId);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'image:', error);
          // Gérer les erreurs
        }
      );
    }
  }
  
}
