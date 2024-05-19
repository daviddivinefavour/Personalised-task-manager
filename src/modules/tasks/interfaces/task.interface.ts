import { TASK_STATUS } from 'src/config/constants';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TASK_STATUS;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type ICreateTask = Pick<
  ITask,
  'title' | 'description' | 'status' | 'userId'
>;

export type IUpdateTask = Partial<ICreateTask>;
