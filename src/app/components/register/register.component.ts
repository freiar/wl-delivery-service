import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  user: User[] = [];
  registrationForm!: FormGroup;

  constructor(
    private userService: UserService,
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the registration form with form controls and validation
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('submit');
      // If the form is valid, submit user details to the UserService
      const userDetails = this.registrationForm.value;
      this.userService.postUser(userDetails).subscribe({
        next: (response: any) => {
          // Handle successful registration
          this.registrationService.setRegistrationStatus(true);

          // Redirect to the account page after successful registration
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          // Handle registration error
          console.error('Registration failed:', error);
        },
      });
    } else {
      // If the form is invalid, mark all form controls as touched
      this.markFormGroupTouched(this.registrationForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    // Recursively mark all controls in the form group as touched
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  register() {
    console.log('register');
    // Trigger the registration process in the RegistrationService
    this.registrationService.registerUser();
  }
}
