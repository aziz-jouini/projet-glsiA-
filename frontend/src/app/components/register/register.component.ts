import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service.service';
import { User, Role } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles = [Role.ADMIN, Role.USER, Role.Employee];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: [Role.USER, Validators.required] // default role is USER
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      this.apiService.registerUser(user).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // Rediriger vers une autre page après l'enregistrement réussi
        },
        (error) => {
          console.error('Registration error:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      );
    }
  }
}
