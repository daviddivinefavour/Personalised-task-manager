import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repo';
import { ResponseService } from '../../../shared/utils/respond.service';
import { IResponseData } from 'src/shared/interfaces/shared.interfaces';
import { TCreateUser } from '../interfaces/user.interface';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
    private readonly responseService: ResponseService,
  ) {}

  async getUser(email: string) {
    this.logger.log('Request to get user by email', { email });
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      this.logger.error('Unable to retrieve user with the email: ', { email });
      return this.responseService.returnResult({
        success: false,
        message: 'Unable to retrieve user',
      });
    }
    return this.responseService.returnResult({
      success: true,
      message: 'User gotten successfully',
      data: user,
    });
  }

  async getUsers(page: number, limit: number): Promise<IResponseData> {
    const users = await this.userRepository.getUsers(page, limit);
    if (!users) {
      this.logger.log('Unable to retrieve users', { users });
      return this.responseService.failResult('Unable to retrieve users');
    }
    return this.responseService.returnResult({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  }

  async createUser(createUserDto: TCreateUser): Promise<IResponseData> {
    this.logger.log('Creating a new user', { createUserDto });
    let user = await this.userRepository.getUserByEmail(createUserDto.email);
    if (user)
      return this.responseService.failResult(
        'Email already registered, try logging in',
      );

    user = await this.userRepository.createUser({
      id: v4(),
      ...(createUserDto as TCreateUser),
    });
    return this.responseService.returnResult({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  }
}
