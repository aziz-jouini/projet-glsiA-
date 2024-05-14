import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/models/reclamation.model';
import { ApiService } from 'src/app/services/api.service.service';
import { ToastrService } from 'ngx-toastr'; // Importez ToastrService
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit {
  // Déclarer une variable pour stocker les données du formulaire de réclamation
  reclamationData: Reclamation = {
    id: 0,
    userId: 0, // Initialiser à 0
    description: ''
  };

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.apiService.loadProfile();
    console.log(this.apiService.accessToken);
    
    // Assurez-vous que vous avez déjà chargé le profil de l'utilisateur
    this.reclamationData.userId = this.apiService.username; // Supposant que username est l'identifiant de l'utilisateur
  }

  // Méthode pour ajouter une réclamation
  addReclamation() {
    this.apiService.addReclamation(this.reclamationData).subscribe(
      (addedReclamation: Reclamation) => {
        this.toastr.success('Réclamation ajoutée avec succès', 'Succès');
        // Réinitialiser les données du formulaire après l'ajout de la réclamation
        this.reclamationData = {
          id: 0,
          userId: this.apiService.username, // Supposant que username est l'identifiant de l'utilisateur
          description: ''
        };
      },
      (error) => {
        this.toastr.error('Une erreur s\'est produite lors de l\'ajout de la réclamation', 'Erreur');
        // Gérer l'erreur ici si nécessaire
      }
    );
  }
  
}
