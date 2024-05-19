import { Injectable, Logger } from '@nestjs/common';
import { AuthenticationRepository } from '../repositories/authentication.repo';
import { UserService } from '../../users/services/user.service';
import {
  ICreateAuthUser,
  ILogin,
  ISuccessfulAuthenticationData,
  ISignUp,
  IAuthentication,
} from '../interfaces/authentication.interface';
import { ResponseService } from '../../../shared/utils/respond.service';
import { JwtService } from '@nestjs/jwt';
import { HelpersService } from 'src/shared/utils/helpers';
import {
  IJwtPayload,
  IResponseData,
} from 'src/shared/interfaces/shared.interfaces';
import { v4 } from 'uuid';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
    private readonly jwtService: JwtService,
    private readonly helperService: HelpersService,
  ) {
    this.logger.log(AuthenticationService.name);
  }

  async create(authenticationDto: ICreateAuthUser) {
    const hashedPassword = this.helperService.hashString(
      authenticationDto.password,
    );
    const authUser: IAuthentication = {
      id: v4(),
      userId: authenticationDto.userId,
      password: hashedPassword,
    };

    const createdAuthUser =
      await this.authenticationRepository.createAuthentication(authUser);
    if (!createdAuthUser) {
      this.logger.error('Unable to create user details');
      return this.responseService.failResult(
        'Something went wrong while creating user, please try again later',
      );
    }
    return this.responseService.returnResult({
      success: true,
      message: 'Successfully saved authentication details',
    });
  }

  async getAuthenticatedUserCredential(userId: string) {
    const authUser =
      await this.authenticationRepository.getAuthCredentialUserById(userId);

    if (!authUser) {
      this.logger.error('Failed to fetch user authentication details');
      return this.responseService.failResult('An error occurred');
    }
    return this.responseService.returnResult({
      success: true,
      message: 'Successfully fetched authentication details',
      data: authUser,
    });
  }

  async validateUserCredentials(loginDto: ILogin) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user.success) {
      this.logger.error('Some thing went wrong with the user', { user });
      return this.responseService.returnResult({
        success: false,
        message: 'Invalid email or password provided',
      });
    }
    const auth = await this.authenticationRepository.getAuthCredentialUserById(
      user.data.id,
    );
    if (!auth) {
      this.logger.error('Some thing went wrong with the user', { auth });
      return this.responseService.failResult(
        'Invalid email or password provided',
      );
    }
    const isCorrectPassword = this.helperService.compareHashedString(
      auth.password,
      loginDto.password,
    );
    if (!isCorrectPassword) {
      this.logger.error('Invalid password provided', { isCorrectPassword });
      return this.responseService.failResult(
        'Invalid email or password provided',
      );
    }
    return user;
  }

  private generateToken(user: IJwtPayload): string {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  async login(
    loginDto: ILogin,
  ): Promise<IResponseData<ISuccessfulAuthenticationData>> {
    this.logger.log('Login user');
    const user = await this.validateUserCredentials(loginDto);
    if (!user) return this.responseService.failResult(user.message);

    const token = this.generateToken({
      id: user.data.id,
      email: user.data.email,
    });
    if (!token) {
      this.logger.error('Something went wrong while generating token', {
        token,
      });
      return this.responseService.failResult(
        'Oops something went wrong, this is not your fault',
      );
    }
    return this.responseService.returnResult({
      success: true,
      message: 'User login successfully',
      data: {
        user: user.data,
        token,
      },
    });
  }

  async signup(
    signupDto: ISignUp,
  ): Promise<IResponseData<ISuccessfulAuthenticationData>> {
    // create user
    const user = await this.userService.createUser(signupDto);
    this.logger.log(user, '\n\n\n');
    if (!user.success) {
      return this.responseService.failResult(user.message);
    }

    // create auth
    const userAuth = await this.create({
      userId: user.data.id,
      password: signupDto.password,
    });
    if (!userAuth.success) {
      return this.responseService.failResult(userAuth.message);
    }

    // generate token
    const token = this.generateToken({
      id: user.data.id,
      email: user.data.email,
    });
    if (!token) {
      this.logger.error('Something went wrong while generating token', {
        token,
      });
      return this.responseService.failResult(
        'Oops something went wrong, this is not your fault',
      );
    }
    return this.responseService.returnResult({
      success: true,
      message: 'Account registered successfully',
      data: {
        user: user.data,
        token,
      },
    });
  }
}
