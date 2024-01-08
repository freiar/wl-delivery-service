import { Component } from '@angular/core';
import { StoreComponent } from "../store/store.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [StoreComponent]
})
export class HomeComponent {

}
