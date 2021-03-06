import { Repository } from 'typeorm';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import User from '../entities/User';
import { ICreateUser } from '../../../domain/models/ICreateUser';

class UserRepository implements IUsersRepository {
  constructor(private ormRepository: Repository<User>) {}

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }
}

export default UserRepository;
