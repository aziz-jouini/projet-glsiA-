import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Image } from '../models/image.model';
import { Menu } from '../models/menu.model'; // Ajout de l'import du modèle Menu
import { Product } from '../models/product.model';
import { Reservation } from '../models/reservation.model';
import { Reclamation } from '../models/reclamation.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:9000/resto'; 

  constructor(private http: HttpClient) { }

  //REGISTER
  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/register`, user, { headers });
  }

  // LOGIN
  loginUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/login`, user, { headers });
  }

  uploadImage(image: FormData): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.post<any>(`${this.apiUrl}/api/admin2/cloudinary/upload`, image, { headers });
  }
  
  listImages(): Observable<Image[]> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.get<Image[]>(`${this.apiUrl}/api/admin2/cloudinary/list`);
  }
  
  deleteImage(imageId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.delete<any>(`${this.apiUrl}/api/admin2/cloudinary/delete/${imageId}`);
  }
  
  addMenu(nom: string, description: string, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('photo', photo);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.post<any>(`${this.apiUrl}/api/admin2/addmenu`, formData, { headers });
}
  updateMenuWithImage(menuId: number, imageId: number): Observable<any> {
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
  return this.http.put<any>(`${this.apiUrl}/api/admin2/menu/${menuId}/image/${imageId}`, null, { headers });
}


  listMenus(): Observable<Menu[]> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.get<Menu[]>(`${this.apiUrl}/api/admin2/listmenu`, { headers });
  }
  addProductToMenu(menuId: number, name: string, price: number, description: string): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('description', description);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.post<any>(`${this.apiUrl}/api/admin2/addproduct/${menuId}`, formData, { headers });
  }

  deleteProduct(productId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.delete<any>(`${this.apiUrl}/api/admin2/deleteproduct/${productId}`, { headers });
  }

  listProducts(menuId: number): Observable<Product[]> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.get<Product[]>(`${this.apiUrl}/api/admin2/listproducts/${menuId}`, { headers });
  }
  addCommande(commande: Reservation): Observable<Reservation> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.post<Reservation>(`${this.apiUrl}/api/user/addcommande`, commande, { headers });
  }

  // Méthode pour récupérer la liste des commandes
  listCommandes(): Observable<Reservation[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Reservation[]>(`${this.apiUrl}/api/user/listcommande`, { headers });
  }
  addReclamation(reclamation: Reclamation): Observable<Reclamation> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.post<Reclamation>(`${this.apiUrl}/api/user/addreclamation`, reclamation, { headers });
  }
  
}
