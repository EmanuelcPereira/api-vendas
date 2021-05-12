import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/Fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

let fakeCustomerRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

describe('Create customer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomerRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'Emanuel Pereira',
      email: 'emanuel@pereira.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customer with the same email', async () => {
    await createCustomerService.execute({
      name: 'Emanuel Pereira',
      email: 'emanuel@pereira.com',
    });

    expect(
      createCustomerService.execute({
        name: 'Emanuel Pereira',
        email: 'emanuel@pereira.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
