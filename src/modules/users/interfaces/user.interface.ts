export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type TCreateUser = Pick<IUser, 'firstName' | 'lastName' | 'email'>;
