import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error-404/error-404.component';
import { StoreComponent } from './components/store/store.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { StoreProductsComponent } from './components/store/store-products/store-products.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';


export const routes: Routes = [
   
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "about-us", component: AboutUsComponent},
    {path: "store", component: StoreComponent},
    {path: "user", component: UserComponent},
    {path: "register", component: RegisterComponent},
    {path: "storeProducts/:id", component: StoreProductsComponent},
    {path: "**", component: Error404Component},
   
];
