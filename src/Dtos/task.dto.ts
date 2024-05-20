import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { ITask } from 'src/modules/tasks/interfaces/task.interface';
import { TASK_STATUS } from 'src/config/constants';
import { PaginationMetaDto } from './default.dto';

export class GetTaskResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Task retrieved successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Task data',
    example: {
      id: '51fe4e77-32b2-4402-8e3f-6dac90fc9c0a',
      title: 'Write Code',
      description: 'Practice coding',
      status: 'pending',
      userId: 'ba833ccc-6b1a-48b3-8ac9-ee2b4ec7dc30',
      updatedAt: '2024-05-19T21:02:27.963Z',
      createdAt: '2024-05-19T21:02:27.963Z',
      deletedAt: null,
    },
  })
  data: ITask;
}

export class CreateTaskRequestDto {
  @IsString()
  @MinLength(1, { message: 'Title is mandatory' })
  @ApiProperty({
    description: 'Task title',
    example: 'Complete homework',
  })
  title: string;

  @IsString()
  @MinLength(1, { message: 'Description is mandatory' })
  @ApiProperty({
    description: 'Task description',
    example: 'Finish math and science homework by tomorrow',
  })
  description: string;

  @IsEnum(TASK_STATUS)
  @IsString()
  @MinLength(1, { message: 'Status is mandatory' })
  @ApiProperty({
    description: 'Task status',
    example: 'pending',
  })
  status: TASK_STATUS;
}

export class CreateTaskResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Task created successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Created task data object',
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Complete homework',
      description: 'Finish math and science homework by tomorrow',
      status: 'pending',
      userId: '123e4567-e89b-12d3-a456-426614174000',
    },
  })
  data: ITask;
}

export class CreateTaskErrorResponseDto {
  @ApiProperty({
    description: 'Response error message',
    example: 'Task creation failed',
  })
  error: string;
}

export class TaskDto {
  @ApiProperty({
    example: '51fe4e77-32b2-4402-8e3f-6dac90fc9c0a',
    description: 'UUID of the task',
  })
  id: string;

  @ApiProperty({ example: 'Task title', description: 'Title of the task' })
  title: string;

  @ApiProperty({
    example: 'Task description',
    description: 'Description of the task',
  })
  description: string;

  @ApiProperty({
    description: 'Task status',
    example: 'pending',
  })
  status: TASK_STATUS;

  @ApiProperty({
    example: '2024-05-19T00:00:00Z',
    description: 'Creation date of the task',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-05-19T00:00:00Z',
    description: 'Last update date of the task',
  })
  updatedAt: Date;
}

export class PaginatedTasksDto {
  @ApiProperty({ type: [TaskDto], description: 'List of tasks' })
  data: TaskDto[];

  @ApiProperty({ type: PaginationMetaDto, description: 'Pagination metadata' })
  pagination: PaginationMetaDto;
}

export class GetTasksSuccessResponseDto {
  @ApiProperty({
    type: String,
    description: 'Message from API',
    example: 'Tasks retrieved successfully',
  })
  message: string;

  @ApiProperty({
    type: PaginatedTasksDto,
    description: 'Data from API',
  })
  data: PaginatedTasksDto;
}

export class GetTasksErrorResponseDto {
  @ApiProperty({
    description: 'Response error message',
    example: 'Unable to retrieve tasks for the user',
  })
  error: string;
}

export class DeleteTaskErrorResponseDto {
  @ApiProperty({
    description: 'Response error message',
    example: 'Unable to delete task',
  })
  error: string;
}
export class DeleteTaskSuccessResponseDto {
  @ApiProperty({
    description: 'Response error message',
    example: 'Task deleted successfully',
  })
  error: string;
}

export class UpdateTaskResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Task updated successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Updated task data object',
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Complete homework',
      description: 'Finish math and science homework by tomorrow',
      status: TASK_STATUS.COMPLETED,
      userId: '123e4567-e89b-12d3-a456-426614174000',
    },
  })
  data: ITask;
}

export class UpdateTaskErrorResponseDto {
  @ApiProperty({
    description: 'Response error message',
    example: 'Unable to update task',
  })
  error: string;
}
