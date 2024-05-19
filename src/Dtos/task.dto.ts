import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { IResponseData } from 'src/shared/interfaces/shared.interfaces';
import { ITask } from 'src/modules/tasks/interfaces/task.interface';
import { TASK_STATUS } from 'src/config/constants';

export class GetTaskResponseDto implements IResponseData<ITask> {
  @ApiProperty({
    type: Boolean,
    description: 'Api status',
    example: true,
  })
  success: boolean;

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

  @IsString()
  @MinLength(1, { message: 'Status is mandatory' })
  @ApiProperty({
    description: 'Task status',
    example: 'pending',
  })
  status: TASK_STATUS;
}

export class CreateTaskResponseDto implements IResponseData<ITask> {
  @ApiProperty({
    type: Boolean,
    description: 'API status',
    example: true,
  })
  success: boolean;

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

export class CreateTaskErrorResponseDto implements IResponseData<null> {
  @ApiProperty({
    type: Boolean,
    description: 'API status',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response error message',
    example: 'Task creation failed',
  })
  error: string;
}
