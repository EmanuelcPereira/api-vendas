import { ICreateOrder } from '../models/ICreateOrder';
import { IOrder } from '../models/IOrder';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>;
  find(): Promise<IOrder[]>;
  createOrder({ customer, products }: ICreateOrder): Promise<IOrder>;
}
