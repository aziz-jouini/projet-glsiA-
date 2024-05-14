import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  newEmployee: Employee = {
    id: 0,
    name: '',
    mission: ''
  };

  employees: Employee[] = [];
  selectedEmployeeForEdit: Employee | null = null; // Propriété pour stocker l'employé sélectionné pour la modification
  isEditMode: boolean = false; // Variable pour contrôler l'affichage du formulaire de modification

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.listEmployees(); // Appel de listEmployees() lors de l'initialisation du composant
  }

  // Méthode pour ajouter un employé
  addEmployee(): void {
    this.apiService.addEmployee(this.newEmployee).subscribe(
      (addedEmployee: Employee) => {
        console.log('Employee added successfully:', addedEmployee);
        // Réinitialisez les champs du formulaire ou effectuez d'autres actions après l'ajout réussi
        this.newEmployee = {
          id: 0,
          name: '',
          mission: ''
        };
        // Rafraîchir la liste des employés après l'ajout d'un nouvel employé
        this.listEmployees();
      },
      (error) => {
        console.error('Error adding employee:', error);
        // Gérez les erreurs ici si nécessaire
      }
    );
  }

  // Méthode pour lister les employés
  listEmployees(): void {
    this.apiService.listEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
        console.log('Employees:', this.employees);
      },
      (error) => {
        console.error('Error listing employees:', error);
        // Gérez les erreurs ici si nécessaire
      }
    );
  }

  // Méthode pour éditer un employé
  editEmployee(employee: Employee): void {
    this.selectedEmployeeForEdit = { ...employee }; // Copie de l'employé sélectionné pour la modification
    this.isEditMode = true; // Affichage du formulaire de modification
  }

  // Méthode pour mettre à jour un employé
  updateEmployee(): void {
    if (this.selectedEmployeeForEdit) {
      // Appel de l'API pour mettre à jour l'employé
      this.apiService.updateEmployee(this.selectedEmployeeForEdit.id, this.selectedEmployeeForEdit).subscribe(
        () => {
          console.log('Employee updated successfully');
          this.selectedEmployeeForEdit = null; // Réinitialisation de l'employé sélectionné pour la modification
          this.isEditMode = false; // Masquage du formulaire de modification
          this.listEmployees(); // Rafraîchissement de la liste des employés
        },
        (error) => {
          console.error('Error updating employee:', error);
          // Gérez les erreurs ici si nécessaire
        }
      );
    }
  }

  // Méthode pour annuler la modification de l'employé
  cancelEdit(): void {
    this.selectedEmployeeForEdit = null; // Réinitialisation de l'employé sélectionné pour la modification
    this.isEditMode = false; // Masquage du formulaire de modification
  }

  // Méthode pour supprimer un employé
  deleteEmployee(employeeId: number): void {
    this.apiService.deleteEmployee(employeeId).subscribe(
      () => {
        console.log('Employee deleted successfully');
        this.listEmployees(); // Rafraîchissement de la liste des employés après la suppression
      },
      (error) => {
        console.error('Error deleting employee:', error);
        // Gérez les erreurs ici si nécessaire
      }
    );
  }
}
