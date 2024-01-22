import { Product } from './product';

export interface CartUpdate {
  count: number;
  products: Product[];
}
