import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorred email/password', 401);
    }

    const passwordConfirmation = await compare(password, user.password);

    if (!passwordConfirmation) {
      throw new AppError('Incorred email/password', 401);
    }

    return user;
  }
}

export default CreateSessionService;
