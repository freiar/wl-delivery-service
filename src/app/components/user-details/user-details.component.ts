import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// import { User } from 'src/app/interfaces/user';
// import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  // user?: User;
  // activatedRoute = inject(ActivatedRoute);
  // userService: UserService = inject(UserService);

  // constructor() {}

  ngOnInit() {
    //   this.activatedRoute.params.subscribe({
    //     next: (params: any) => {
    //       let id = params.id;
    //       console.log(params.id);
    //       this.userService
    //         .getUserById(id)
    //         .pipe(map((response: any) => response.data))
    //         .subscribe({
    //           next: (data: any) => {
    //             console.log(data);
    //             this.user = data;
    //           },
    //         });
    //     },
    //   });
    // }
  }
}
