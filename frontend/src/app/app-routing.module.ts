import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddReservationsComponent } from './components/add-reservations/add-reservations.component';
import { AddReclamationComponent } from './components/add-reclamation/add-reclamation.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"contact",component:ContactComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"admin",component:AdminComponent},
  {path:"user",component:UserComponent},
  {path:"admin/add-menu",component:AddMenuComponent},
  {path:"admin/add-image",component:AddImageComponent},
  {path:"admin/add-product",component:AddProductComponent},
  {path:"user/add-reservations",component:AddReservationsComponent},
  {path:"user/add-reclamation",component:AddReclamationComponent},
  {path:"admin/add-employee",component:AddEmployeeComponent},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
