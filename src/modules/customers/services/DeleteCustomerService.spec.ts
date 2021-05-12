import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../domain/repositories/Fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import DeleteCustomerService from './DeleteCustomerService';

let fakeCustomerRepository: FakeCustomersRepository;
let deleteCustomerService: DeleteCustomerService;
let createCustomerService: CreateCustomerService;

describe('Delete customer Service', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomerRepository);
    deleteCustomerService = new DeleteCustomerService(fakeCustomerRepository);
  });

  it('should be able to delete a customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'Emanuel Pereira',
      email: 'emanuel@pereira.com',
    });

    await deleteCustomerService.execute(customer);

    expect(200);
  });

  it('should not be able to delete a customer not found', async () => {
    await expect(
      deleteCustomerService.execute({ id: 'no-existent-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
