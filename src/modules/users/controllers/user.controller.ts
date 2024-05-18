import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/user.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserErrorResponseDto,
  CreateUserResponseDto,
  UsersResponseDto,
} from 'src/Dtos/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get Users endpoint',
    description: 'Get all users in the system.',
    tags: ['Users'],
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
  @ApiOkResponse({
    type: UsersResponseDto,
    description: 'Get users response',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to retrieve users',
  })
  async getUsers(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
  ): Promise<Response> {
    const users = await this.userService.getUsers(page, limit);
    if (!users.success) {
      return res.status(400).json({ error: users.message });
    }
    return res.status(200).json({ message: users.message, data: users.data });
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Endpoint to create a new user',
    tags: ['User'],
  })
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({
    type: CreateUserErrorResponseDto,
    description: 'User exists',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.createUser(createUserDto);
    if (user.success)
      return res.status(201).json({
        message: 'User created successfully',
        data: user,
      });
    return res.status(400).json({ message: user.message });
  }
}
