import {
  Column,
  Model,
  PrimaryKey,
  Table,
  DeletedAt,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { TASK_STATUS, Tables } from 'src/config/constants';
import { User } from 'src/modules/users/models/user.model';

@Table({
  tableName: Tables.TASKS,
  timestamps: true,
  underscored: true,
  modelName: 'Task',
  paranoid: true,
})
export class Task extends Model<Task> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  title: string;

  @Column
  description: string;

  @Default(TASK_STATUS.PENDING)
  @Column
  status: TASK_STATUS;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User, 'userId')
  user: User;

  @DeletedAt
  deletedAt?: Date;
}
