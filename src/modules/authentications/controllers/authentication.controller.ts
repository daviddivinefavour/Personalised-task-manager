import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { Response } from 'express';
import { Public } from 'src/shared/decorators/public.route.decorator';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  LoginErrorResponseDto,
  LoginRequestDto,
  LoginSuccessResponseDto,
} from 'src/Dtos/authenitcation.dto';
import {
  CreateUserErrorResponseDto,
  CreateUserRequestDto,
  CreateUserResponseDto,
} from 'src/Dtos/user.dto';

@ApiTags('Authentication') // Tag for grouping all authentication-related endpoints
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login a user',
    description:
      'Endpoint to authenticate a user by providing user login credentials',
  })
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({
    description: 'Successful login',
    type: LoginSuccessResponseDto,
  })
  @ApiBadRequestResponse({
    type: LoginErrorResponseDto,
    description: 'Could not login',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(
    @Body() loginDto: LoginRequestDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authenticationService.login(loginDto);
    if (!user.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: user.message });
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: user.message, data: user.data });
  }

  @Post('/register')
  @Public()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Endpoint to create a new user',
  })
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
    description: 'The user has been registered successfully.',
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
    const user = await this.authenticationService.signup(createUserDto);
    if (user.success)
      return res.status(HttpStatus.CREATED).json({
        message: user.message,
        data: user.data,
      });
    return res.status(HttpStatus.BAD_REQUEST).json({ error: user.message });
  }
}
