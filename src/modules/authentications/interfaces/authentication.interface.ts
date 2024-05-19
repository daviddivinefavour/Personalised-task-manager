import { IUser } from 'src/modules/users/interfaces/user.interface';

export interface IAuthentication {
  id: string;
  userId: string;
  password: string;
  lastSeen?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type ICreateAuthUser = Pick<IAuthentication, 'userId' | 'password'>;

export interface ILogin {
  email: string;
  password: string;
}

export interface ISuccessfulAuthenticationData {
  token: string;
  user: IUser | Record<string, any>;
}

export interface ISignUp extends ILogin {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
