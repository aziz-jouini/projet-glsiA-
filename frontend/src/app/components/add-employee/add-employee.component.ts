import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  name: string = '';
  mission: string = '';

  constructor(private apiService: ApiService) { }

  onSubmit() {
    this.apiService.addEmployee({ name: this.name, mission: this.mission }).subscribe(
      (response) => {
        console.log('Employé ajouté avec succès !', response);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'employé :', error);
      }
    );
  }
}
