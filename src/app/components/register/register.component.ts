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
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?) |0)?[0-9]{10}$")]]
      })
  }
  onSubmit() {
    if(this.registerForm.valid){

      let registration: Registration = this.registerForm.value;
      this.registrationService.addRegistration(registration)
      console.log("valid")
    }
  } }
  


