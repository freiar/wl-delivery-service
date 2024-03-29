import { Product } from './product';

export interface Store {
  id: number;
  name: string;
  category: string;
  address: string;
  products: Product[];
  photo: string;
  rate: number;
}
