import Product from '@modules/products/infra/typeorm/entities/Product';
import { ICreateProduct } from '../models/ICreateProduct';
import { IFindProducts } from '../models/IFindProducts';
import { IUpdateProducts } from '../models/IUpdateProducts';

export interface IProductsRepository {
  findById(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  findAllByIds(products: IFindProducts[]): Promise<Product[]>;
  find(): Promise<Product[]>;
  create({ name, price, quantity }: ICreateProduct): Promise<Product>;
  updateStock(products: IUpdateProducts[]): Promise<void>;
  save(product: Product): Promise<Product>;
  remove(product: Product): Promise<void>;
}
