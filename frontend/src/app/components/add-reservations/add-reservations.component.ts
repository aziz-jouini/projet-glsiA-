import { Component } from '@angular/core';
import { CommandeStatus, Reservation } from 'src/app/models/reservation.model';
import { ApiService } from 'src/app/services/api.service.service'; // Correction de l'import

@Component({
  selector: 'app-add-reservations',
  templateUrl: './add-reservations.component.html',
  styleUrls: ['./add-reservations.component.css']
})
export class AddReservationsComponent {
  reservation: Reservation = {
    id: 0,
    user: { id: 9, username: 'ziied', firstname: 'Zied', lastname: 'zied', password: 'password' },
    typeTable: '', // Correction: Retirer la déclaration de type String
    dateTime: new Date(),
    commandeStatus: CommandeStatus.EN_ATTENTE
  };

  constructor(private apiService: ApiService) { }

  submitReservationForm(): void {
    this.apiService.addCommande(this.reservation).subscribe(
      (addedCommande) => {
        console.log('Commande ajoutée avec succès :', addedCommande);
        // Réinitialisez le formulaire après l'ajout de la commande

        this.reservation = {
          id: 0,
          user: { id: 1, username: 'john_doe', firstname: 'John', lastname: 'Doe', password: 'password' },
          typeTable: '', // Retirez cette ligne si vous ne souhaitez pas initialiser le type de table
          dateTime: new Date(),
          commandeStatus: CommandeStatus.EN_ATTENTE
        };
        localStorage.setItem('reservation', JSON.stringify(this.reservation)); 
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la commande :', error);
      }
    );
  }
}
