import {
  Column,
  Model,
  PrimaryKey,
  Table,
  DeletedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Tables } from 'src/config/constants';
import { IAuthentication } from '../interfaces/authentication.interface';
import { User } from 'src/modules/users/models/user.model';

@Table({
  tableName: Tables.AUTHENTICATION,
  timestamps: true,
  underscored: true,
  modelName: 'Authentication',
  paranoid: true,
})
export class Authentication
  extends Model<Authentication>
  implements IAuthentication
{
  @PrimaryKey
  @Column
  id: string;

  @Column
  password: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User, 'userId')
  user: User;

  @Column
  lastSeen?: Date;

  @DeletedAt
  deletedAt?: any;
}
