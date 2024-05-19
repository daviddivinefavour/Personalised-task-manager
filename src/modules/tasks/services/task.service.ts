import { Injectable, Logger } from '@nestjs/common';
import { TaskRepository } from '../repositories/task.repo';
import { ResponseService } from '../../../shared/utils/respond.service';
import { IResponseData } from 'src/shared/interfaces/shared.interfaces';
import { ICreateTask, IUpdateTask } from '../interfaces/task.interface';
import { v4 } from 'uuid';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly logger: Logger,
    private readonly responseService: ResponseService,
  ) {}

  async getTaskById(id: string, userId: string): Promise<IResponseData> {
    const task = await this.taskRepository.getTask(id, userId);
    if (!task) {
      this.logger.error('Unable to retrieve task with the id: ', { id });
      return this.responseService.failResult('Unable to retrieve task');
    }
    return this.responseService.returnResult({
      success: true,
      message: 'Task retrieved successfully',
      data: task,
    });
  }

  async getTasksByUserId(userId: string): Promise<IResponseData> {
    this.logger.log('Request to get tasks by userId', { userId });
    const tasks = await this.taskRepository.getTasksByUserId(userId);
    if (!tasks || tasks.length === 0) {
      this.logger.error('Unable to retrieve tasks for the userId: ', {
        userId,
      });
      return this.responseService.failResult(
        'Unable to retrieve tasks for the user',
      );
    }
    return this.responseService.returnResult({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks,
    });
  }

  async createTask(createTaskDto: ICreateTask): Promise<IResponseData> {
    const task = await this.taskRepository.createTask({
      id: v4(),
      ...createTaskDto,
    });
    return this.responseService.returnResult({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  }

  async updateTask(
    id: string,
    updateTaskDto: IUpdateTask,
  ): Promise<IResponseData> {
    const [numberOfAffectedRows, updatedTasks] =
      await this.taskRepository.updateTask(id, updateTaskDto);
    if (numberOfAffectedRows === 0) {
      this.logger.error('Unable to update task with id: ', { id });
      return this.responseService.failResult('Unable to update task');
    }
    return this.responseService.returnResult({
      success: true,
      message: 'Task updated successfully',
      data: updatedTasks[0],
    });
  }

  async deleteTask(id: string): Promise<IResponseData> {
    this.logger.log('Request to delete task', { id });
    const numberOfDeletedRows = await this.taskRepository.deleteTask(id);
    if (numberOfDeletedRows === 0) {
      this.logger.error('Unable to delete task with id: ', { id });
      return this.responseService.failResult('Unable to delete task');
    }
    return this.responseService.returnResult({
      success: true,
      message: 'Task deleted successfully',
    });
  }
}
