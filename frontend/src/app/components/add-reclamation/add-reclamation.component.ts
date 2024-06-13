import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/models/reclamation.model';
import { ApiService } from 'src/app/services/api.service.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit {
  reclamationData: Reclamation = {
    id: 0,
    userId: 0,
    description: ''
  };

  reclamations: Reclamation[] = [];
  isAdmin: boolean = false;

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.apiService.loadProfile();
    const token = this.apiService.accessToken;

    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.reclamationData.userId = decodedToken.userId;
      this.isAdmin = decodedToken.roles.includes('ROLE_ADMIN');
    } else {
      console.error('No access token found.');
    }

    this.loadReclamations();
  }

  addReclamation() {
    this.apiService.addReclamation(this.reclamationData).subscribe(
      (addedReclamation: Reclamation) => {
        this.toastr.success('Réclamation ajoutée avec succès', 'Succès');
        this.reclamationData = {
          id: 0,
          userId: this.reclamationData.userId,
          description: ''
        };
        this.loadReclamations();
      },
      (error) => {
        this.toastr.error('Une erreur s\'est produite lors de l\'ajout de la réclamation', 'Erreur');
      }
    );
  }

  loadReclamations(): void {
    this.apiService.listReclamations().subscribe(
      (reclamations: Reclamation[]) => {
        if (this.isAdmin) {
          this.reclamations = reclamations;
        } else {
          this.reclamations = reclamations.filter(reclamation => reclamation.userId === this.reclamationData.userId);
        }
        console.log('Réclamations chargées avec succès :', this.reclamations);
      },
      (error) => {
        console.error('Erreur lors du chargement des réclamations :', error);
      }
    );
  }
}
