import { Component } from '@angular/core';
import { Reclamation } from 'src/app/models/reclamation.model';
import { ApiService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent {
reclamation: Reclamation = {
    id: 0,
    user: { id: 9, username: 'ziied', firstname: 'Zied', lastname: 'zied', password: 'password' },
   description: ''
  };

  constructor(private apiService: ApiService) { }

  submitReclamationForm(): void {
    this.apiService.addReclamation(this.reclamation).subscribe(
      (addedReclamation) => {
        console.log('reclamation ajoutée avec succès :', addedReclamation);
        // Réinitialisez le formulaire après l'ajout de la commande
        this.reclamation = {
          id: 0,
          user: { id: 1, username: 'john_doe', firstname: 'John', lastname: 'Doe', password: 'password' },
          description: ''
        };
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la reclamation :', error);
      }
    );
  }
}


