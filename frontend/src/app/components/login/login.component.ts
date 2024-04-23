import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService,  private router: Router ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.apiService.loginUser(credentials).subscribe(
        (response) => {
          console.log('Login successful:', response);
          if (response && response.role) {
            localStorage.setItem('userRole', response.role); // Stocker le rôle dans le stockage local
            // Redirection vers la page appropriée en fonction du rôle
            if (response.role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else if (response.role === 'USER') {
              this.router.navigate(['/user']);
            }
          } else {
            console.error('Role not found in response:', response);
            // Traiter le cas où le rôle n'est pas présent dans la réponse de l'API
          }
        }
      );
    }
  }
}
