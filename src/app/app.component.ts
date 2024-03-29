import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './core/footer/footer.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error-404/error-404.component';
import { StoreComponent } from './components/store/store.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { StoreProductsComponent } from './components/store/store-products/store-products.component';
import { NavigationBarComponent } from './core/navigation-bar/navigation-bar.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './core/header/header.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    Error404Component,
    StoreComponent,
    NavigationBarComponent,
    AboutUsComponent,
    StoreProductsComponent,
    CartComponent,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    ContactComponent,
    RegisterComponent,
    HeaderComponent,
    RegisterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
