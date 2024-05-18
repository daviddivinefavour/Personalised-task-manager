import 'dotenv/config';

export const TOKEN_SECRET = process.env.JWT_SECRET;
export enum Tables {
  USERS = 'users',
  AUTHENTICATION = 'authentications',
  OTP = 'one_time_pins',
  TODO = 'todos',
}
