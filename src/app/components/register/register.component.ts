import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators} from '@angular/forms';
  import { RegistrationService } from '../../services/registration.service';

import { Registration } from '../../interfaces/registration';
/*
@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
  ] 
}),*/


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private fromBuilder: FormBuilder,
    private registrationService: RegistrationService) {

  }

  ngOnInit(): void {
      this.registerForm = this.fromBuilder.group({
        firstname: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z]+$')]],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telephone: ['', [Validators.required, Validators.pattern('0-9')]]
      })
  }
  onSubmit() {
    if(this.registerForm.valid){

      let registration: Registration = this.registerForm.value;
      this.registrationService.addRegistration(registration)
      console.log("valid")
    }
  } }
  
  

  
  /*ngOnInit(): void {
    this.userService
      .getUsers()
      .pipe(map((response: any) => response.data))
      .subscribe({
        next: (response) => {
          setTimeout(() => {
            console.log(response);
            this.users = response;
            this.hasLoaded = true;
          }, 200);
        },
      });
  } */


  

 /* register(registerForm: NgForm) {
    console.log(registerForm);
  }

  viewUserDetails(id: number) {
    console.log('hello');
    this.router.navigate(['users', id]);
  }

  onLastnameChange(change: any) {
    console.log(change);
  }

  submit() {
    console.warn(this.registerForm.value);
  }

  firstname() {
    return this.registerForm.get('firstname');
  }
  lastname() {
    return this.registerForm.get('lastname');
  }
  email() {
    return this.registerForm.get('email');
  }
  mobile() {
    return this.registerForm.get('mobile');
  }
  registerSubmited() {
    console.log(this.registerForm.value);
  }*/

