
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.css',
})
export class Error404Component {}
