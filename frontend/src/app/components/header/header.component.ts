import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false; 

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check user role from local storage
    const userRole = localStorage.getItem('userRole');
    this.isAdmin = userRole === 'ADMIN';
  }
  logout(): void {
    // Supprimer le rôle du local storage
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    // Naviguer vers la page d'accueil
    this.router.navigate(['/']);
  }
}
