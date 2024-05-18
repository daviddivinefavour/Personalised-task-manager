import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/modules/users/interfaces/user.interface';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsMatch } from 'src/shared/decorators/is-match.decorator';
import { IResponseData } from 'src/shared/interfaces/shared.interfaces';

export class GetUserSuccessResponseDto implements IResponseData<IUser> {
  @ApiProperty({
    type: Boolean,
    description: 'Api status',
    example: true,
  })
  success: boolean;

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
      verifiedAt: new Date().toISOString(),
    },
  })
  data: IUser;
}

export class GetUsersSuccessResponseDto implements IResponseData<IUser[]> {
  @ApiProperty({
    type: Boolean,
    description: 'Api status',
    example: true,
  })
  success: boolean;

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
        verifiedAt: new Date().toISOString(),
      },
    ],
  })
  data: IUser[];
}

export class CreateUserResponseDto implements IResponseData<IUser> {
  @ApiProperty({
    type: Boolean,
    description: 'Api status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'User created successfully',
  })
  message: string;

  @ApiProperty({
    description: 'User ID',
    example: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@example.com',
      updatedAt: '2024-05-18T20:51:19.471Z',
      createdAt: '2024-05-18T20:51:19.471Z',
      verifiedAt: null,
      deletedAt: null,
    },
  })
  data: IUser;
}

export class CreateUserRequestDto {
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

export class CreateUserErrorResponseDto implements IResponseData<null> {
  @ApiProperty({
    type: Boolean,
    description: 'Api status',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response error message',
    example: 'Email already registered, try logging in',
  })
  message: string;
}

export class GetUserBadRequestErrorResponseDto implements IResponseData<null> {
  @ApiProperty({
    type: Boolean,
    description: 'Api status',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response error message',
    example: 'Unable to retrieve user',
  })
  message: string;
}
