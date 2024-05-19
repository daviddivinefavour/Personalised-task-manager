import {
  Column,
  Model,
  PrimaryKey,
  Table,
  DeletedAt,
} from 'sequelize-typescript';
import { IUser } from '../interfaces/user.interface';
import { Tables } from 'src/config/constants';

@Table({
  tableName: Tables.USERS,
  timestamps: true,
  underscored: true,
  modelName: 'User',
  paranoid: true,
})
export class User extends Model<User> implements IUser {
  @PrimaryKey
  @Column
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @DeletedAt
  deletedAt?: any;
}
