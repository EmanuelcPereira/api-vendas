import { Repository } from 'typeorm';
import UserToken from '../entities/User_token';
import { IUsersTokenRepository } from '../../../domain/repositories/IUsersTokenRepository';

class UserTokensRepository implements IUsersTokenRepository {
  constructor(private ormRepository: Repository<UserToken>) {}

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
