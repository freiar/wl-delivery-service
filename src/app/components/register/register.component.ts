import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';

import { Registration } from '../../interfaces/registration';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',

  providers: [RegistrationService, UserService],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  isUserRegistered: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?) |0)?[0-9]{10}$')],
      ],
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      let registration: Registration = this.registerForm.value;
      this.registrationService.addRegistration(registration);
      console.log('valid');
      this.registerUser();
      this.navigateToHome();
    }
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  registerUser() {
    this.isUserRegistered = true;
    const registeredUser: User = {
      first_name: this.registerForm.value.firstname,
      id: 0,
      avatar: '',
      last_name: '',
      email: '',
      disabled: false,
      phone: '',
    };

    this.userService.setRegisteredUser(registeredUser);
  }
}
