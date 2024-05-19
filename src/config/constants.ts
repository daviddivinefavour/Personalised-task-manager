import 'dotenv/config';

export const TOKEN_SECRET =
  process.env.JWT_SECRET || 'nskjnsdcvnoi4n3weod8hijnjk3b4ewdsio';

export enum Tables {
  USERS = 'users',
  AUTHENTICATION = 'authentications',
  TODO = 'todos',
}
