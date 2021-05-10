import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';
interface IRequest {
  id: string;
}

@injectable()
class ShowCustomerService {
  constructor(
    @inject('customersRepository')
    private customersRepository: CustomersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;
