import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error-404/error-404.component';
import { StoreComponent } from './components/store/store.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { StoreProductsComponent } from './components/store/store-products/store-products.component';


export const routes: Routes = [
   
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "about-us", component: AboutUsComponent},
    {path:"store", component: StoreComponent},
    {path:"storeProducts", component: StoreProductsComponent},
    {path: "**", component: Error404Component},
   
];
