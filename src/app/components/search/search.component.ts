import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnDestroy {
  [x: string]: any;
  form!: FormGroup;
  errorMessage: string | undefined;
  private destroy$ = new Subject<void>(); // Subject to manage subscription destruction

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit() {
    this.setFormValues(); // Initialize the form
  }

  ngOnDestroy() {
    this.destroy$.next(); // Emit signal to unsubscribe from observables
    this.destroy$.complete(); // Complete the subject to release resources
  }

  // Form initialization
  setFormValues() {
    this.form = new FormGroup({
      searchData: new FormControl(''), // Initialize the form control
    });
  }

  // Form submission handler
  onSubmit() {
    this.errorMessage = ''; // Reset the error message
    let name = this.form.get('searchData')?.value; // Retrieve search input

    this.storeService
      .getStoreByName(name)
      .pipe(
        takeUntil(this.destroy$) // Unsubscribe when the component is destroyed
      )
      .subscribe({
        next: (store) => {
          if (store) {
            this.router.navigate(['/storeProducts', store.id]); // Navigate to store if found
          } else {
            this.router.navigate(['/error404']); // Navigate to error404 if store not found
          }
        },
        error: (error) => {
          console.error('Error fetching store information', error);
          this.router.navigate(['/error404', name]); // Navigate to error404 on error
        },
      });

    // Clear the search input after submitting the form
    this.form.get('searchData')?.setValue('');
  }
}
