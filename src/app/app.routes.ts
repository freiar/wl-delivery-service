import { FoodStoresComponent } from './components/food-stores/food-stores.component';
import { ContactComponent } from './components/contact/contact.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error-404/error-404.component';
import { StoreComponent } from './components/store/store.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { StoreProductsComponent } from './components/store/store-products/store-products.component';
import { Error403Component } from './components/error-403/error-403.component';
import { StoreMainComponent } from './components/store-main/store-main.component';
import { TopStoresFoodComponent } from './components/top-stores-food/top-stores-food.component';
import { TopStoresDrinkComponent } from './components/top-stores-drink/top-stores-drink.component';
import { DrinkStoresComponent } from './components/drink-stores/drink-stores.component';
import { AllPlacedOrdersComponent } from './components/all-placed-orders/all-placed-orders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'store', component: StoreComponent },
  { path: 'store-main/:storeId', component: StoreMainComponent },
  { path: 'storeProducts/:id', component: StoreProductsComponent },
  { path: 'topStoresFood', component: TopStoresFoodComponent },
  { path: 'topStoresDrink', component: TopStoresDrinkComponent },
  { path: 'drinkStores', component: DrinkStoresComponent },
  { path: 'foodStores', component: FoodStoresComponent },
  { path: 'order/1/all-placed-orders', component: AllPlacedOrdersComponent },
  { path: 'order/2/all-placed-orders', component: AllPlacedOrdersComponent },
  { path: 'order/3/all-placed-orders', component: AllPlacedOrdersComponent },
  { path: 'all-placed-orders', component: AllPlacedOrdersComponent },
  { path: 'error403', component: Error403Component },
  { path: 'error404/:name', component: Error404Component },
  { path: 'error404', component: Error404Component },
  { path: '**', component: Error404Component },
];
