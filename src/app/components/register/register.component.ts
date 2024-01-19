import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements     OnInit{
  registerForm: FormGroup | undefined;
//registerForm: any;

  constructor() {}

  ngOnInit() {
    this.userService.getUsers()
    .pipe(map((response: any) => response.data))
    .subscribe({
      next: response => {
        setTimeout(() => {
          console.log(response);
          this.users = response;
          this.hasLoaded = true;
        }, 200);
      }
    })
  }

  viewUserDetails(id: number){
    console.log("hello");
    this.router.navigate(["users", id]);
  }

}

  ngOnInit(): void {
      
    this.registerForm = new FormGroup({
      firstname: new FormControl("", [Validators.required,Validators.email,Validators.pattern('[a-zA-Z]+$')]),
      lastname: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required]),
      telephone: new FormControl("",[Validators.required])

      
    });

    submit()
    {
      console.warn(this.registerForm.value);
    }

    get firstname(){
      return this.registerForm.get('firstname');
    }
    get lastname(){
      return this.registerForm.get('lastname');
    }
    get email(){
      return this.registerForm.get('email');
    }
    get mobile(){
      return this.registerForm.get('mobile');
    }
  }
  registerSubmited(){
    console.log(this.registerForm.value);
  } 
}
function firstname() {
  throw new Error('Function not implemented.');
}

function lastname() {
  throw new Error('Function not implemented.');
}

function email() {
  throw new Error('Function not implemented.');
}

function mobile() {
  throw new Error('Function not implemented.');
}

