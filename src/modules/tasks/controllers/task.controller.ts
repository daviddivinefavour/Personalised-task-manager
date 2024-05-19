import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Delete,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateTaskErrorResponseDto,
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  DeleteTaskErrorResponseDto,
  DeleteTaskSuccessResponseDto,
  GetTaskResponseDto,
  GetTasksErrorResponseDto,
  GetTasksSuccessResponseDto,
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

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get tasks by user ID',
    description: 'Endpoint to get all tasks for the authenticated user',
  })
  @ApiOkResponse({
    description: 'Tasks retrieved successfully',
    type: GetTasksSuccessResponseDto,
  })
  @ApiBadRequestResponse({
    type: GetTasksErrorResponseDto,
    description: 'Failed to retrieve tasks',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 25,
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getTasksByUserId(
    @Req() req: Request,
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
  ): Promise<Response> {
    const userId = getUserIdFromRequest(req);
    const tasks = await this.taskService.getTasksByUserId(userId, page, limit);
    if (tasks.success) {
      return res.status(HttpStatus.OK).json({
        message: tasks.message,
        data: tasks.data,
      });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({ error: tasks.message });
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

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete task by ID',
    description: 'Endpoint to delete a task by its ID',
  })
  @ApiOkResponse({
    description: 'Task deleted successfully',
    type: DeleteTaskSuccessResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Fails to delete task',
    type: DeleteTaskErrorResponseDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the task to delete.',
    type: String,
    example: '51fe4e77-32b2-4402-8e3f-6dac90fc9c0a',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async deleteTask(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const userId = getUserIdFromRequest(req);
    const result = await this.taskService.deleteTask(id, userId);
    if (result.success) {
      return res.status(HttpStatus.OK).json({
        message: result.message,
      });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message });
  }
}
