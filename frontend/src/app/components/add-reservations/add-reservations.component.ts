import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommandeStatus, Reservation } from 'src/app/models/reservation.model';
import { ApiService } from 'src/app/services/api.service.service'; // Correction de l'import

@Component({
  selector: 'app-add-reservations',
  templateUrl: './add-reservations.component.html',
  styleUrls: ['./add-reservations.component.css']
})
export class AddReservationsComponent implements OnInit{
  reservation: Reservation = {
    id: 0,
    user: { id: 1, username: '', firstname: '', lastname: '', password: '' ,role:undefined},
    typeTable: '', // Correction: Retirer la déclaration de type String
    dateTime: new Date(),
    commandeStatus: CommandeStatus.EN_ATTENTE
  };

  showUserId!: number;
  commandeStatusOptions: CommandeStatus[] = [
  CommandeStatus.EN_ATTENTE,
  CommandeStatus.ACCEPTE,
  CommandeStatus.REFUSE
];;

  reservations: Reservation[] = [];
  isAdmin: boolean = false;
  accessToken: any;
  esmloul:any;
  constructor(private apiService: ApiService,private router:Router) { }
  ngOnInit(): void {

    this.accessToken = localStorage.getItem('token');

    let decodedJwt: any = jwtDecode(this.accessToken);
            this.reservation.user.username = decodedJwt.sub;
        this.reservation.user.firstname = decodedJwt.firstname;
        this.reservation.user.lastname = decodedJwt.lastname;
        this.reservation.user.id = decodedJwt.id;
        this.reservation.user.role = decodedJwt.role;

        this.loadReservation();

        this.apiService.loadProfile();
        if (this.apiService.UserRole === 'ADMIN') {
          this.isAdmin = true;
        }
        else {
          this.isAdmin = false;
        }
  }
  // Méthode pour mettre à jour le statut de la commande
updateCommandeStatus(reservation: Reservation): void {
  this.apiService.updateCommandeStatus(reservation.id, reservation.commandeStatus).subscribe(
    (response) => {
      console.log('Statut de la commande mis à jour avec succès :', response);
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du statut de la commande :', error);
    }
  );
}

onChangeCommandeStatus(): void {
  this.reservations.forEach((reservation) => {
    if (reservation.commandeStatus !== CommandeStatus.EN_ATTENTE) {
      this.updateCommandeStatus(reservation);
    }
  });

    this.router.navigate(['/home']);

  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

  loadReservation(): void {
    this.apiService.listCommandes().subscribe(
      (reservations: Reservation[]) => {
        if (this.isAdmin) {
          // Si l'utilisateur est un administrateur, afficher toutes les réservations
          this.reservations = reservations;
        } else {
          // Sinon, filtrer les réservations pour n'afficher que celles de l'utilisateur actuel
          this.reservations = reservations.filter(reservation => reservation.user.id === this.reservation.user.id);
        }
        console.log('Réservations chargées avec succès :', this.reservations);
      },
      (error) => {
        console.error('Erreur lors du chargement des réservations :', error);
      }
    );

  }





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
          this.router.navigate(['/user']);
        },
      (error) => {
        console.error('Erreur lors de l\'ajout de la commande :', error);
      }
    );
  }




}
