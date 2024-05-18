import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserRequestDto,
  CreateUserErrorResponseDto,
  CreateUserResponseDto,
  GetUsersSuccessResponseDto,
  GetUserSuccessResponseDto,
  GetUserBadRequestErrorResponseDto,
} from 'src/Dtos/user.dto';
import { v4 } from 'uuid';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users in the system.',
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
    type: GetUsersSuccessResponseDto,
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
    @Body() createUserDto: CreateUserRequestDto,
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

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Endpoint to fetch a new user by providing user ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the user to retrieve.',
    type: String,
    example: 'ce0c8981-893a-4649-85d1-6796c8094b81',
  })
  @ApiOkResponse({
    type: GetUserSuccessResponseDto,
    description: 'User data has been fetched successfully.',
  })
  @ApiBadRequestResponse({
    type: GetUserBadRequestErrorResponseDto,
    description: 'Bad request, unable to retrieve user.',
  })
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return res.status(HttpStatus.OK).json(user);
  }
}
