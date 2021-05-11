import User from '@modules/users/infra/typeorm/entities/User';

export interface IUserAuthenticated {
  user: User;
  token: string;
}
