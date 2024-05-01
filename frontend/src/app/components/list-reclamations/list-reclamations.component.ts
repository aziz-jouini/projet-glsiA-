import { Component } from '@angular/core';
import { Reclamation } from 'src/app/models/reclamation.model';
import { ApiService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-list-reclamations',
  templateUrl: './list-reclamations.component.html',
  styleUrls: ['./list-reclamations.component.css']
})
export class ListReclamationsComponent {
  reclamations: Reclamation[] = []; // Liste des images

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    
    this.apiService.listReclamations().subscribe(
      (response: Reclamation[]) => { 
        console.log('Liste des reclamations récupérée avec succès:', response);
        this.reclamations = response; 
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des reclamations:', error);
        
      }
    );
  }
}
