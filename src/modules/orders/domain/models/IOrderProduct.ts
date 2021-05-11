import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';

export interface IOrderProduct {
  id: string;
  price: number;
  quantity: number;
  order: Order;
  order_id: string;
  product: Product;
  product_id: string;
  created_at: Date;
  updated_at: Date;
}
