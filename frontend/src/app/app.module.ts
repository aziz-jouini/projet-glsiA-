import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { ContinueComponent } from './components/continue/continue.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { JwtInterceptor } from './jwt.interceptor';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddReservationsComponent } from './components/add-reservations/add-reservations.component';
import { AddReclamationComponent } from './components/add-reclamation/add-reclamation.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ContinueComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    AddMenuComponent,
    AddImageComponent,
    AddProductComponent,
    AddReservationsComponent,
    AddReclamationComponent,
    AddEmployeeComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
