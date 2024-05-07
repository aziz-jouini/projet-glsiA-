import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
userRole:any;
authentification:boolean=false;

  constructor(private router: Router,private apiservice:ApiService) { }

  ngOnInit(): void {
    // Check user role from local storage
    this.userRole = localStorage.getItem('userRole');

    this.apiservice.loadProfile();
    this.authentification=this.apiservice.isAuthenticated;
    if (this.apiservice.UserRole === 'ADMIN') {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }


  }
  logout(): void {
    this.userRole = localStorage.getItem('userRole');


    // Supprimer le rôle du local storage
    window.localStorage.removeItem('userRole');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('firstname');
    window.localStorage.removeItem('lastname');
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('username');

    this.apiservice.isAuthenticated=false;
    // Naviguer vers la page d'accueil
    this.router.navigate(['/home']);
    setTimeout(() => {
      window.location.reload();
    }, 750);
  }
}
