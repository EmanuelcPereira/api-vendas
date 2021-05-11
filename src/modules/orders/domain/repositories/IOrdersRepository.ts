import Order from '@modules/orders/infra/typeorm/entities/Order';
import { ICreateOrder } from '../models/ICreateOrder';

export interface IOrdersRepository {
  findById(id: string): Promise<Order | undefined>;
  createOrder({ customer, products }: ICreateOrder): Promise<Order>;
}
