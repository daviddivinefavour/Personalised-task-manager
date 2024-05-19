import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ISuccessfulAuthenticationData } from 'src/modules/authentications/interfaces/authentication.interface';

export class LoginRequestDto {
  @IsEmail({}, { message: 'Please provide a valid email' })
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
}

export class LoginSuccessResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'User login successfully',
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

export class LoginErrorResponseDto {
  @ApiProperty({
    description: 'Response error message',
    example: 'Invalid email or password provided',
  })
  error: string;
}
