import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/Fakes/FakeCustomersRepository';
import UpdateCustomerService from './UpdateCustomerService';

let fakeCustomerRepository: FakeCustomersRepository;
let updateCustomer: UpdateCustomerService;

describe('Create customer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    updateCustomer = new UpdateCustomerService(fakeCustomerRepository);
  });

  it('should be able to update a customer data', async () => {
    const customer = await fakeCustomerRepository.create({
      name: 'Emanuel Pereira',
      email: 'emanuel@pereira.com',
    });

    const updatedCustomer = await updateCustomer.execute({
      id: customer.id,
      name: 'Emanuel Cardoso',
      email: 'emanuel@pereira.com',
    });

    expect(updatedCustomer.name).toBe('Emanuel Cardoso');
    expect(updatedCustomer.email).toBe('emanuel@pereira.com');
  });

  it('should not be able to update data of not found customer', async () => {
    await expect(
      updateCustomer.execute({
        id: 'non-existent-id',
        name: 'Emanuel Cardoso',
        email: 'emanuel@pereira.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to anoter email', async () => {
    await fakeCustomerRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    const user = await fakeCustomerRepository.create({
      name: 'Test',
      email: 'test@example.com',
    });

    await expect(
      updateCustomer.execute({
        id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
