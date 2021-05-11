import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { IProduct } from './IProduct';

export interface ICreateOrder {
  customer: Customer;
  products: IProduct[];
}
