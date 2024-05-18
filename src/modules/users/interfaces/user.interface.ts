export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  verifiedAt?: Date;
}

export type TCreateUser = Pick<IUser, 'firstName' | 'lastName' | 'email'>;
