import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/user.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersResponseDto } from 'src/Dtos/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({
  //   summary: 'Get Users endpoint',
  //   description: 'Get all users in the system.',
  //   tags: ['Users'],
  // })
  // @ApiOkResponse({
  //   type: UsersResponseDto,
  //   status: 200,
  //   description: 'Successful',
  // })
  // @ApiBadRequestResponse({
  //   status: 400,
  //   description: 'Unable to retrieve users',
  // })
  // async getUsers(
  //   @Res() res: Response,
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 25,
  // ): Promise<Response> {
  //   const users = await this.userService.getUsers(page, limit);
  //   if (!users.success) {
  //     return res.status(400).json({ message: users.message });
  //   }
  //   return res.status(200).json({ message: users.message, data: users.data });
  // }

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
}
