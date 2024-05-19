import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { Task } from '../models/task.model';
import { ITask, IUpdateTask } from '../interfaces/task.interface';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task)
    private taskEntity: typeof Task,
  ) {}

  async createTask(createTaskDto: ITask): Promise<Task> {
    return this.taskEntity.create(createTaskDto);
  }

  async getTask(taskId: string, userId: string): Promise<Task | null> {
    return this.taskEntity.findOne({
      where: {
        id: taskId,
        userId,
      },
    });
  }

  async updateTask(
    taskId: string,
    updateTaskDto: IUpdateTask,
  ): Promise<[number, Task[]]> {
    return this.taskEntity.update(updateTaskDto, {
      where: { id: taskId },
      returning: true,
    });
  }

  async deleteTask(taskId: string): Promise<number> {
    return this.taskEntity.destroy({ where: { id: taskId } });
  }

  async getTasksByUserId(userId: string): Promise<Task[]> {
    return this.taskEntity.findAll({ where: { userId } });
  }
}
