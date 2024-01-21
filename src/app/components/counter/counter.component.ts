import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../../interfaces/product';

export interface CounterUpdate {
  id: number;
  count: number;
  index?: number;
}

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  // Input property to receive the count value from the parent component.
  @Input() count: number = 0;
  // Input property to receive the product object from the parent component.
  @Input() product: Product | undefined;

  // Output property to emit changes in count back to the parent component.
  @Output() countChange = new EventEmitter<{
    productId: number;
    count: number;
  }>();

  // Method to increment the count and emit the updated count to the parent component.
  increment(): void {
    this.count++;
    this.emitCountChange();
  }

  // Method to decrement the count (if it's greater than 0) and emit the updated count to the parent component.

  decrement(): void {
    if (this.count > 0) {
      this.count--;
      this.emitCountChange();
    }
  }

  // Private method to emit the count change event with the productId and the updated count.
  private emitCountChange() {
    this.countChange.emit({
      productId: this.product?.id || 0,
      count: this.count,
    });
  }
}
