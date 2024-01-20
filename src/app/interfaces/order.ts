export interface Order {
  orderId: number;
  customerId: number;
  orderDate: string;
  price: number;
  statusOfOrder: string;
  ingredients: string;
  paymentInfo: string;
  products: string;
  photo: string;
  storeName: string;
  storeId: number;
}

export interface OrderList {
  orders: Order[];
  orderId: number;
  customerId: number;
  orderDate: string;
  price: number;
  statusOfOrder: string;
  ingredients: string;
  paymentInfo: string;
  products: string;
  photo: string;
  store: string;
  storeId: number;
}
