import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../domain/repositories/Fakes/FakeCustomersRepository';
import ShowCustomerService from './ShowCustomerService';

let fakeCustomerRepository: FakeCustomersRepository;
let showCustomer: ShowCustomerService;

describe('Show Customer Service', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    showCustomer = new ShowCustomerService(fakeCustomerRepository);
  });

  it('should be able to show a customer data', async () => {
    const customer = await fakeCustomerRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@dasilva.com',
    });

    const profile = await showCustomer.execute({ id: customer.id });

    expect(profile.name).toBe('Fulano da Silva');
    expect(profile.email).toBe('fulano@dasilva.com');
  });

  it('should not be able show a not found customer', async () => {
    await expect(
      showCustomer.execute({ id: 'non-existent-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
