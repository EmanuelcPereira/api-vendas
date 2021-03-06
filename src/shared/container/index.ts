import { container } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '../../modules/customers/infra/typeorm/repositories/CustomersRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import ProductsRepository from '@modules/products/infra/typeorm/Repositories/ProductsRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IUsersRepository } from '../../modules/users/domain/repositories/IUsersRepository';
import UserRepository from '../../modules/users/infra/typeorm/repositories/UserRepository';
import { IUsersTokenRepository } from '../../modules/users/domain/repositories/IUsersTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);

container.registerSingleton<IUsersTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
