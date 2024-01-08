import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductService } from './services/product.service';
import { SearchbuttonComponent } from './components/searchbutton/searchbutton.component';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error-404/error-404.component';
import { StoreComponent } from './components/store/store.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { StoreProductsComponent } from './components/store/store-products/store-products.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
             RouterOutlet,
             ProductComponent, 
             SearchbuttonComponent,
             HomeComponent, 
             Error404Component,
             StoreComponent,
            HeaderComponent,
            AboutUsComponent,
            StoreProductsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
}
