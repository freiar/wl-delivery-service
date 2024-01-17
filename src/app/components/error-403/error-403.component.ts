import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error403',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error-403.component.html',
  styleUrl: './error-403.component.css',
})
export class Error403Component {}
