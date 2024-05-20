import { Injectable, Logger } from '@nestjs/common';
import { TaskRepository } from '../repositories/task.repo';
import { ResponseService } from '../../../shared/utils/respond.service';
import { IResponseData } from 'src/shared/interfaces/shared.interfaces';
import { ICreateTask, IUpdateTask } from '../interfaces/task.interface';
import { v4 } from 'uuid';
import { HelpersService } from 'src/shared/utils/helpers';
import { TaskGateway } from 'src/shared/gateways/websocket.gateway';
import { TASK_GATEWAY_EVENT_METHOD } from 'src/config/constants';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly logger: Logger,
    private readonly responseService: ResponseService,
    private readonly helperService: HelpersService,
    private readonly taskGateway: TaskGateway,
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

  async getTasksByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<IResponseData> {
    this.logger.log('Request to get tasks by userId', { userId });
    const tasks = await this.taskRepository.getTasksByUserId(
      userId,
      page,
      limit,
    );
    if (!tasks) {
      this.logger.error('Unable to retrieve tasks for the userId: ', {
        userId,
      });
      return this.responseService.failResult(
        'Unable to retrieve tasks for the user',
      );
    }
    const paginatedData = this.helperService.paginate(tasks, page, limit);
    return this.responseService.returnResult({
      success: true,
      message: 'Tasks retrieved successfully',
      data: paginatedData,
    });
  }

  async createTask(createTaskDto: ICreateTask): Promise<IResponseData> {
    const task = await this.taskRepository.createTask({
      id: v4(),
      ...createTaskDto,
    });
    const user = await task.fetchAssociatedUser();
    const assignee = user.firstName;
    this.taskGateway.sendTaskUpdate(
      {
        ...task.dataValues,
        assignee,
        method: TASK_GATEWAY_EVENT_METHOD.CREATE,
      },
      `${assignee} has created a new task.`,
    );
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
    const user = await updatedTasks[0].fetchAssociatedUser();
    const assignee = user.firstName;
    this.taskGateway.sendTaskUpdate(
      {
        ...updatedTasks[0].dataValues,
        assignee,
        method: TASK_GATEWAY_EVENT_METHOD.UPDATE,
      },
      `${assignee} has updated their task.`,
    );
    return this.responseService.returnResult({
      success: true,
      message: 'Task updated successfully',
      data: updatedTasks[0],
    });
  }

  async deleteTask(id: string, userId: string): Promise<IResponseData> {
    const numberOfDeletedRows = await this.taskRepository.deleteTask(
      id,
      userId,
    );
    if (numberOfDeletedRows === 0) {
      this.logger.error('Unable to delete task with id: ', { id });
      return this.responseService.failResult('Unable to delete task');
    }
    this.taskGateway.sendTaskUpdate(
      { id, method: TASK_GATEWAY_EVENT_METHOD.DELETE },
      `A task was deleted.`,
    );
    return this.responseService.returnResult({
      success: true,
      message: 'Task deleted successfully',
    });
  }
}
