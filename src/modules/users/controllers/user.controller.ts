import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/user.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  GetUsersSuccessResponseDto,
  GetUserSuccessResponseDto,
  GetUserBadRequestErrorResponseDto,
} from 'src/Dtos/user.dto';

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
      return res.status(HttpStatus.BAD_REQUEST).json({ error: users.message });
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: users.message, data: users.data });
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
      return res.status(HttpStatus.BAD_REQUEST).json({ error: user.message });
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: user.message, data: user.data });
  }
}
