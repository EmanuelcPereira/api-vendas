import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';
import RedisCache from '../../../shared/cache/RedisCache';

@injectable()
class ListOrderService {
  constructor(
    @inject('ordersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(): Promise<Order[]> {
    const redisCache = new RedisCache();

    let orders = await redisCache.recover<Order[]>('api-vendas-ORDER_LIST');

    if (!orders) {
      orders = await this.ordersRepository.find();

      await redisCache.save('api-vendas-ORDER_LIST', orders);
    }

    return orders;
  }
}

export default ListOrderService;
