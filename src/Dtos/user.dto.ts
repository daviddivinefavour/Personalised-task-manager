import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/modules/users/interfaces/user.interface';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsMatch } from 'src/shared/decorators/is-match.decorator';
import { IResponseData } from 'src/shared/interfaces/shared.interfaces';
import {
  ISuccessfulAuthenticationData,
  ISignUp,
} from 'src/modules/authentications/interfaces/authentication.interface';

export class GetUserSuccessResponseDto {
  @ApiProperty({
    type: String,
    description: 'Message from api',
    example: 'User retrieved successfully',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Data from api',
    example: {
      id: 'ce0c8981-893a-4649-85d1-6796c8094b81',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    },
  })
  data: IUser;
}

export class GetUsersSuccessResponseDto {
  @ApiProperty({
    type: String,
    description: 'Message from api',
    example: 'Users retrieved successfully',
  })
  message: string;

  @ApiProperty({
    type: Object,
    description: 'Data from api',
    example: [
      {
        id: 'ce0c8981-893a-4649-85d1-6796c8094b81',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
      },
    ],
  })
  data: IUser[];
}

export class CreateUserResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Account registered successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Login response data object',
    example: {
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'user@example.com',
        updatedAt: '2024-05-18T20:51:19.471Z',
        createdAt: '2024-05-18T20:51:19.471Z',
        deletedAt: null,
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkOGFlMGMxLTkzZTUtNDNiMS05OGMzLWY2NjY3NjE0MjU3ZCIsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMTIyNDA5OSwiZXhwIjoxNzAxNDgzMjk5fQ.CmGBWoTPWGHPPTpf_TN8KfgdzbZFSXQX_35yuHB_1xg',
    },
  })
  data: ISuccessfulAuthenticationData;
}

export class CreateUserRequestDto implements ISignUp {
  @IsString()
  @IsNotEmpty({ message: 'First name is mandatory' })
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is mandatory' })
  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  lastName: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsNotEmpty({ message: 'Email is mandatory' })
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiProperty({
    description: 'User password',
    example: 'strongPassword123',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Confirm Password is mandatory' })
  @IsMatch('password', { message: 'Passwords do not match' })
  @ApiProperty({
    description: 'Confirm initial password',
    example: 'strongPassword123',
  })
  confirmPassword: string;
}

export class CreateUserErrorResponseDto {
  @ApiProperty({
    description: 'Response error message',
    example: 'Email already registered, try logging in',
  })
  error: string;
}

export class GetUserBadRequestErrorResponseDto {
  @ApiProperty({
    description: 'Response error message',
    example: 'Unable to retrieve user',
  })
  error: string;
}
