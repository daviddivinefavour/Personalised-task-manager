import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateTaskErrorResponseDto,
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  GetTaskResponseDto,
} from 'src/Dtos/task.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { getUserIdFromRequest } from 'src/shared/utils/authentication.utils';

@ApiTags('Tasks') // Tag for grouping all task-related endpoints
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get task by ID',
    description: 'Endpoint to get a task by its ID',
  })
  @ApiOkResponse({
    description: 'Task retrieved successfully',
    type: GetTaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid task ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the task to retrieve.',
    type: String,
    example: '51fe4e77-32b2-4402-8e3f-6dac90fc9c0a',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getTaskById(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const userId = getUserIdFromRequest(req);
    const task = await this.taskService.getTaskById(id, userId);
    if (task.success) {
      return res.status(HttpStatus.OK).json({
        message: task.message,
        data: task.data,
      });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({ error: task.message });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Endpoint to create a new task',
  })
  @ApiBody({ type: CreateTaskRequestDto })
  @ApiCreatedResponse({
    type: CreateTaskResponseDto,
    description: 'The task has been created successfully.',
  })
  @ApiBadRequestResponse({
    type: CreateTaskErrorResponseDto,
    description: 'Task creation failed',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createTask(
    @Body() createTaskDto: CreateTaskRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const userId = getUserIdFromRequest(req);
    const result = await this.taskService.createTask({
      ...createTaskDto,
      userId,
    });
    if (result.success) {
      return res.status(HttpStatus.CREATED).json({
        message: result.message,
        data: result.data,
      });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message });
  }
}
