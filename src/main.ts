import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './app/components/register/register.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


@NgModule({
  declarations: [
   
  ],
  imports: [
    BrowserModule,
    AppComponent,
    RegisterComponent
   
  ],
  providers: [],
  
})
export class AppModule{}
