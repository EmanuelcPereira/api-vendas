import FakeCustomersRepository from '../domain/repositories/Fakes/FakeCustomersRepository';
import ListCustomerService from './ListCustomerService';

let fakeCustomerRepository: FakeCustomersRepository;
let listCustomer: ListCustomerService;

describe('List Customer Service', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    listCustomer = new ListCustomerService(fakeCustomerRepository);
  });

  it('should be able to list all customers', async () => {
    const customer = listCustomer.execute();

    expect(customer);
  });
});
